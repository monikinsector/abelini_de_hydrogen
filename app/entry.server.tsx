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
  // Zendesk: Allows loading the snippet.js script from zdassets.com
  const scriptSrcMatch = baseHeader.match(/script-src[^;]+/);
  if (scriptSrcMatch) {
    header = header.replace(
      /(script-src[^;]+)/,
      `$1 https://widget.trustpilot.com https://integrations.etrusted.com https://static.zdassets.com https://*.zdassets.com`
    );
  } else {
    // Extract default-src values (without the directive name) to reuse in script-src
    const defaultSrcMatch = baseHeader.match(/default-src\s+([^;]+)/);
    const defaultSrcValues = defaultSrcMatch ? defaultSrcMatch[1] : "'self'";
    header = header.replace(
      /(default-src[^;]+)/,
      `$1; script-src ${defaultSrcValues} https://widget.trustpilot.com https://integrations.etrusted.com https://static.zdassets.com https://*.zdassets.com`
    );
  }
  
  // Add style-src for Google Fonts, eTrusted widget, and Zendesk
  // Zendesk: Allows loading widget styles from zdassets.com
  const styleSrcMatch = header.match(/style-src[^;]+/);
  if (styleSrcMatch) {
    header = header.replace(
      /(style-src[^;]+)/,
      `$1 https://fonts.googleapis.com https://fonts.gstatic.com https://integrations.etrusted.com https://*.zdassets.com`
    );
  } else {
    header = header + `; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com https://fonts.gstatic.com https://integrations.etrusted.com https://*.zdassets.com http://localhost:*`;
  }
  
  // Add font-src for Google Fonts
  const fontSrcMatch = header.match(/font-src[^;]+/);
  if (fontSrcMatch) {
    header = header.replace(
      /(font-src[^;]+)/,
      `$1 https://fonts.gstatic.com`
    );
  } else {
    header = header + `; font-src 'self' https://fonts.gstatic.com https://cdn.shopify.com`;
  }
  
  // Add connect-src for widget API calls and WebSocket connections
  // Zendesk: Allows API calls to zendesk.com, zdassets.com, and WebSocket connections to zopim.com
  // Required for chat widget to establish real-time connections
  const connectSrcMatch = header.match(/connect-src[^;]+/);
  if (connectSrcMatch) {
    header = header.replace(
      /(connect-src[^;]+)/,
      `$1 https://widget.trustpilot.com https://integrations.etrusted.com https://*.zendesk.com https://*.zdassets.com https://*.zopim.com wss://*.zopim.com wss://widget-mediator.zopim.com https://instafeed.nfcube.com`
    );
  } else {
    header = header + `; connect-src 'self' https://cdn.shopify.com/ https://monorail-edge.shopifysvc.com https://widget.trustpilot.com https://integrations.etrusted.com https://*.zendesk.com https://*.zdassets.com https://*.zopim.com wss://*.zopim.com wss://widget-mediator.zopim.com http://localhost:* ws://localhost:* ws://127.0.0.1:* ws://*.tryhydrogen.dev:* https://instafeed.nfcube.com`;
  }

  const imgSrcMatch = header.match(/img-src[^;]+/);
  if (imgSrcMatch) {
    header = header.replace(
      /(img-src[^;]+)/,
      `$1 https://*.cdninstagram.com https://*.fbcdn.net https://images.weserv.nl data:`
    );
  } else {
    header = header + `; img-src 'self' https://*.cdninstagram.com https://*.fbcdn.net https://images.weserv.nl data:`;
  }

  header = header.replace(/;;+/g, ';'); // Remove double semicolons
  
  // Add frame-src for Trustpilot and Zendesk iframes
  // Zendesk: Allows embedding the chat widget iframe from zendesk.com and zdassets.com
  const frameSrcMatch = header.match(/frame-src[^;]+/);
  if (frameSrcMatch) {
    header = header.replace(
      /(frame-src[^;]+)/,
      `$1 https://widget.trustpilot.com https://*.zendesk.com https://*.zdassets.com`
    );
  } else {
    header = header + `; frame-src 'self' https://widget.trustpilot.com https://*.zendesk.com https://*.zdassets.com`;
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
