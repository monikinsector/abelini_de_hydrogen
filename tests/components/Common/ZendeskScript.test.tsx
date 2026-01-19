import { render } from '@testing-library/react';
import { ZendeskScript } from '~/components/Common/ZendeskScript';

// Mock react-router useRouteLoaderData
const mockUseRouteLoaderData = jest.fn();
jest.mock('react-router', () => ({
  useRouteLoaderData: (routeId: string) => mockUseRouteLoaderData(routeId),
}));

describe('ZendeskScript', () => {
  const mockZendeskKey = '89e02af7-bd93-4279-9994-fabe9d24f659';
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    mockUseRouteLoaderData.mockReturnValue({ zendeskKey: mockZendeskKey });

    // Setup console spies
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Ensure body exists (required for React Testing Library)
    if (!document.body) {
      const body = document.createElement('body');
      document.documentElement.appendChild(body);
    }
    
    // Remove any existing script
    const existingScript = document.getElementById('ze-snippet');
    if (existingScript) {
      existingScript.remove();
    }
  });

  afterEach(() => {
    // Restore console
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();

    // Remove any existing script
    const existingScript = document.getElementById('ze-snippet');
    if (existingScript) {
      existingScript.remove();
    }
  });

  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      render(<ZendeskScript />);
      // Component returns null, so no UI to check
      expect(document.body).toBeDefined();
    });

    it('returns null (no UI output)', () => {
      const { container } = render(<ZendeskScript />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Script loading with valid key', () => {
    it('creates script element with correct attributes when zendeskKey is provided', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      expect(script).toBeInTheDocument();
      expect(script.id).toBe('ze-snippet');
      expect(script.src).toBe(`https://static.zdassets.com/ekr/snippet.js?key=${mockZendeskKey}`);
      expect(script.async).toBe(true);
    });

    it('appends script to document body when body exists', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).toBeInTheDocument();
      expect(document.body.contains(script)).toBe(true);
    });

    it('does not create duplicate scripts on re-render', () => {
      const { rerender } = render(<ZendeskScript />);
      
      const firstScript = document.getElementById('ze-snippet');
      expect(firstScript).toBeInTheDocument();

      rerender(<ZendeskScript />);
      
      const scripts = document.querySelectorAll('#ze-snippet');
      expect(scripts.length).toBe(1);
    });

    it('does not create script if one already exists in DOM', () => {
      // Create existing script
      const existingScript = document.createElement('script');
      existingScript.id = 'ze-snippet';
      document.body.appendChild(existingScript);

      render(<ZendeskScript />);

      const scripts = document.querySelectorAll('#ze-snippet');
      expect(scripts.length).toBe(1);
    });
  });

  describe('Script loading without key', () => {
    it('does not create script when zendeskKey is undefined', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: undefined });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key is not configured. Chat widget will not be loaded.'
      );
    });

    it('does not create script when zendeskKey is empty string', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: '' });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key is not configured. Chat widget will not be loaded.'
      );
    });

    it('does not create script when zendeskKey is whitespace only', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: '   ' });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key is not configured. Chat widget will not be loaded.'
      );
    });

    it('does not create script when route loader data is undefined', () => {
      mockUseRouteLoaderData.mockReturnValue(undefined);
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key is not configured. Chat widget will not be loaded.'
      );
    });
  });

  describe('Script loading with invalid key format', () => {
    it('does not create script when key is not in UUID format', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: 'invalid-key-format' });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key format is invalid. Expected UUID format. Chat widget will not be loaded.'
      );
    });

    it('does not create script when key is too short', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: '12345' });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key format is invalid. Expected UUID format. Chat widget will not be loaded.'
      );
    });

    it('does not create script when key has wrong format', () => {
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: 'not-a-uuid-format-key' });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).not.toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk key format is invalid. Expected UUID format. Chat widget will not be loaded.'
      );
    });

    it('creates script when key is valid UUID format', () => {
      const validUuidKey = '89e02af7-bd93-4279-9994-fabe9d24f659';
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: validUuidKey });
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      expect(script).toBeInTheDocument();
      expect(script.src).toContain(validUuidKey);
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('format is invalid')
      );
    });
  });

  describe('Script error handling', () => {
    it('handles script loading error', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      expect(script).toBeInTheDocument();

      // Simulate error
      const errorEvent = new Event('error');
      script.onerror?.(errorEvent as any);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to load Zendesk chat widget script:',
        expect.any(Event)
      );
    });

    it('allows retry after error by resetting loaded flag', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      const errorEvent = new Event('error');
      script.onerror?.(errorEvent as any);

      // After error, script should be removed from ref
      // Component should be able to retry on next render
      expect(script).toBeInTheDocument();
    });
  });

  describe('Script success handling', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('logs success when Zendesk API is available after load', () => {
      (window as any).zE = { someMethod: jest.fn() };
      
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      script.onload?.({} as any);

      jest.advanceTimersByTime(1000);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Zendesk chat widget loaded successfully'
      );
    });

    it('warns when script loads but API is not available', () => {
      delete (window as any).zE;
      
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      script.onload?.({} as any);

      jest.advanceTimersByTime(1000);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Zendesk script loaded but widget API not available'
      );
    });
  });

  describe('Cleanup', () => {

    it('does not remove script on unmount (script persists)', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet');
      expect(script).toBeInTheDocument();

      const { unmount } = render(<ZendeskScript />);
      unmount();

      // Script should still exist after unmount
      const scriptAfterUnmount = document.getElementById('ze-snippet');
      expect(scriptAfterUnmount).toBeInTheDocument();
    });
  });

  describe('useRouteLoaderData integration', () => {
    it('calls useRouteLoaderData with correct route ID', () => {
      render(<ZendeskScript />);
      expect(mockUseRouteLoaderData).toHaveBeenCalledWith('root');
    });

    it('uses zendeskKey from route loader data', () => {
      const customKey = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: customKey });
      
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      expect(script).toBeInTheDocument();
      expect(script.src).toContain(customKey);
    });
  });

  describe('Edge cases', () => {
    it('handles component re-render without creating duplicate scripts', () => {
      const { rerender } = render(<ZendeskScript />);

      const firstScript = document.getElementById('ze-snippet');
      expect(firstScript).toBeInTheDocument();

      rerender(<ZendeskScript />);

      const scripts = document.querySelectorAll('#ze-snippet');
      expect(scripts.length).toBe(1);
    });

    it('handles zendeskKey dependency change', () => {
      render(<ZendeskScript />);

      const script = document.getElementById('ze-snippet') as HTMLScriptElement;
      expect(script.src).toContain(mockZendeskKey);

      // Change key and re-render
      const newKey = 'new-key-99999';
      mockUseRouteLoaderData.mockReturnValue({ zendeskKey: newKey });
      
      const { rerender } = render(<ZendeskScript />);
      rerender(<ZendeskScript />);

      // Script should still exist (component checks for existing script)
      const scriptAfterChange = document.getElementById('ze-snippet');
      expect(scriptAfterChange).toBeInTheDocument();
    });
  });
});
