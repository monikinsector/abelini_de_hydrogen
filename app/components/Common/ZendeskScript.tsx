import {useEffect, useRef} from 'react';
import {useRouteLoaderData} from 'react-router';
import type {RootLoader} from '~/root';

/**
 * Zendesk Web Widget Component
 * 
 * Loads the Zendesk chat widget script asynchronously to avoid blocking page render.
 * Implements proper cleanup and error handling following industry best practices.
 * 
 * @see https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/
 */
export function ZendeskScript() {
  const loaded = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  
  // Get data from route loader - will be undefined if not available yet
  const data = useRouteLoaderData<RootLoader>('root');
  
  // Use env variable if available, otherwise fallback to hardcoded key
  // The hardcoded key ensures the widget works even if env variable isn't configured
  const zendeskKey = data?.zendeskKey;

  useEffect(() => {
    // Early return if not in browser environment
    if (typeof window === 'undefined') return;

    // Early return if already loaded or script already exists
    if (loaded.current) return;
    
    const existingScript = document.getElementById('ze-snippet');
    if (existingScript) {
      loaded.current = true;
      return;
    }

    // Validate Zendesk key format
    if (!zendeskKey || zendeskKey.trim() === '') {
      console.warn('Zendesk key is not configured. Chat widget will not be loaded.');
      return;
    }

    // Validate Zendesk key format (UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    const zendeskKeyPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!zendeskKeyPattern.test(zendeskKey.trim())) {
      console.warn('Zendesk key format is invalid. Expected UUID format. Chat widget will not be loaded.');
      return;
    }

    loaded.current = true;

    // Create and configure the script element
    const script = document.createElement('script');
    script.id = 'ze-snippet';
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    script.async = true;
    // Note: Don't use both async and defer together - async is sufficient

    // Error handling for script loading failures
    script.onerror = (error) => {
      console.error('Failed to load Zendesk chat widget script:', error);
      loaded.current = false; // Allow retry on error
      scriptRef.current = null;
    };

    // Success handler to verify script loaded
    script.onload = () => {
      // Wait a bit for Zendesk to initialize, then check if it's available
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).zE) {
          console.log('Zendesk chat widget loaded successfully');
        } else {
          console.warn('Zendesk script loaded but widget API not available');
        }
      }, 1000);
    };

    // Store reference for cleanup
    scriptRef.current = script;

    // Append script to body
    let observer: MutationObserver | null = null;
    
    if (document.body) {
      document.body.appendChild(script);
    } else {
      // Wait for body to be available
      observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
          document.body.appendChild(script);
          obs.disconnect();
          observer = null;
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup function
    return () => {
      // Clean up MutationObserver if it's still running
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      // Don't remove the script itself - Zendesk needs it to persist across route changes
      // The script will be reused if the component remounts
    };
  }, [zendeskKey]);

  return null;
}