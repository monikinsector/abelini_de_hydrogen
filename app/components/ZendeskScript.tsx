import {useEffect, useRef} from 'react';

export function ZendeskScript() {
  const loaded = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loaded.current) return;
    if (document.getElementById('ze-snippet')) {
      loaded.current = true;
      return;
    }

    loaded.current = true;

    const script = document.createElement('script');
    script.id = 'ze-snippet';
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=89e02af7-bd93-4279-9994-fabe9d24f659';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}