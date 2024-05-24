import { useEffect } from 'react';

export function useListenKey(key: string, callback: (...args: any) => any) {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [key, callback]);
}
