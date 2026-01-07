import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header: baseHeader, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  // Add external resources to CSP
  let header = baseHeader;
  
  // Add script-src for widget scripts
  const scriptSrcMatch = baseHeader.match(/script-src[^;]+/);
  if (scriptSrcMatch) {
    header = header.replace(
      /(script-src[^;]+)/,
      `$1 https://widget.trustpilot.com https://integrations.etrusted.com`
    );
  } else {
    header = header.replace(
      /(default-src[^;]+)/,
      `$1; script-src $1 https://widget.trustpilot.com https://integrations.etrusted.com`
    );
  }
  
  // Add style-src for Google Fonts
  const styleSrcMatch = header.match(/style-src[^;]+/);
  if (styleSrcMatch) {
    header = header.replace(
      /(style-src[^;]+)/,
      `$1 https://fonts.googleapis.com https://fonts.gstatic.com`
    );
  } else {
    header = header + `; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com https://fonts.gstatic.com http://localhost:*`;
  }
  
  // Add connect-src for widget API calls
  const connectSrcMatch = header.match(/connect-src[^;]+/);
  if (connectSrcMatch) {
    header = header.replace(
      /(connect-src[^;]+)/,
      `$1 https://widget.trustpilot.com https://integrations.etrusted.com`
    );
  } else {
    header = header + `; connect-src 'self' https://cdn.shopify.com/ https://monorail-edge.shopifysvc.com https://widget.trustpilot.com https://integrations.etrusted.com http://localhost:* ws://localhost:* ws://127.0.0.1:* ws://*.tryhydrogen.dev:*`;
  }
  
  // Add frame-src for Trustpilot iframes
  const frameSrcMatch = header.match(/frame-src[^;]+/);
  if (frameSrcMatch) {
    header = header.replace(
      /(frame-src[^;]+)/,
      `$1 https://widget.trustpilot.com`
    );
  } else {
    header = header + `; frame-src 'self' https://widget.trustpilot.com`;
  }

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
