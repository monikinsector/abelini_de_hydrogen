# Zendesk Live Chat Widget

## Overview

The `ZendeskScript` component is a React component that integrates the Zendesk Web Widget (live chat) into the Shopify Hydrogen application. It loads the Zendesk chat widget script asynchronously to provide customer support functionality without blocking page rendering.

### Key Features

- **Asynchronous Loading**: Loads the Zendesk script asynchronously to avoid blocking page render
- **Automatic Initialization**: Automatically initializes when the component mounts
- **Key Validation**: Validates Zendesk API key format (UUID) before loading
- **Error Handling**: Implements proper error handling and retry logic
- **SSR Compatible**: Handles server-side rendering gracefully
- **Route Persistence**: Script persists across route changes for better performance
- **MutationObserver Support**: Handles cases where document.body is not immediately available

### Component Location

- **File Path**: `app/components/Common/ZendeskScript.tsx`
- **Usage**: Integrated in `app/root.tsx` at the application root level

### Integration Points

The component is used in the root layout (`app/root.tsx`) and is rendered on every page:

```tsx
<ZendeskScript />
```

This ensures the chat widget is available site-wide for customer support.

## Configuration

### Environment Variable

The Zendesk API key is configured via environment variable:

- **Variable Name**: `PUBLIC_ZENDESK_KEY`
- **Format**: UUID format (e.g., `89e02af7-bd93-4279-9994-fabe9d24f659`)
- **Location**: Set in environment configuration

### Key Format Validation

The component validates that the Zendesk key follows the UUID format:
- Pattern: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Example: `89e02af7-bd93-4279-9994-fabe9d24f659`

If an invalid key format is provided, the component will:
- Log a warning to the console
- Skip loading the widget
- Not create the script element

## How It Works

### Initialization Flow

1. **Component Mounts**: Component renders (returns `null`, no UI)
2. **Key Retrieval**: Retrieves `zendeskKey` from route loader data
3. **Validation**: Validates key exists and matches UUID format
4. **Script Creation**: Creates script element with Zendesk CDN URL
5. **DOM Injection**: Appends script to `document.body`
6. **Initialization**: Zendesk widget initializes automatically

### Script Loading

The component loads the Zendesk script from:
```
https://static.zdassets.com/ekr/snippet.js?key={zendeskKey}
```

### Error Handling

- **Missing Key**: Logs warning, skips loading
- **Invalid Format**: Logs warning, skips loading
- **Script Load Error**: Logs error, allows retry on next render
- **API Not Available**: Logs warning after successful script load

### Cleanup Behavior

- **On Unmount**: Cleans up MutationObserver if active
- **Script Persistence**: Script remains in DOM (by design) to persist across route changes
- **Re-mount Handling**: Detects existing script and reuses it

## Technical Details

### Dependencies

- **React Hooks**: `useEffect`, `useRef`
- **React Router**: `useRouteLoaderData` for accessing root loader data
- **Browser APIs**: `MutationObserver` for delayed body availability

### Browser Compatibility

- Works in all modern browsers
- Handles SSR environments (returns early if `window` is undefined)
- Gracefully handles missing `document.body` using MutationObserver

### Performance Considerations

- **Non-blocking**: Script loads asynchronously
- **Single Instance**: Prevents duplicate script loading
- **Route Persistence**: Script persists across navigation for better UX

## Testing

Comprehensive unit tests are available at:
- **Test File**: `tests/components/Common/ZendeskScript.test.tsx`
- **Coverage**: 23 test cases covering all scenarios
- **Test Scenarios**:
  - Script creation and attributes
  - Key validation (valid/invalid formats)
  - Error handling
  - Success handling
  - Cleanup behavior
  - Route loader integration
  - Edge cases

## Troubleshooting

### Widget Not Appearing

1. **Check Console**: Look for warnings about missing or invalid key
2. **Verify Key Format**: Ensure key is in UUID format
3. **Check Environment**: Verify `PUBLIC_ZENDESK_KEY` is set correctly
4. **Network Tab**: Check if script is loading from Zendesk CDN

### **Common Issues**

- **"Zendesk key is not configured"**: Environment variable not set
- **"Zendesk key format is invalid"**: Key doesn't match UUID pattern
- **"Failed to load Zendesk chat widget script"**: Network error or invalid key
- **"Zendesk script loaded but widget API not available"**: Zendesk initialization issue


## **References**

- [Zendesk Web Widget SDK Documentation](https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/)
- Component Source: `app/components/Common/ZendeskScript.tsx`
- Test Suite: `tests/components/Common/ZendeskScript.test.tsx`
