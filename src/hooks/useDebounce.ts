import { useEffect, useState } from 'react';

export function useDebounce(initValue: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(initValue);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(initValue);
    }, delay);

    return () => clearTimeout(id);
  }, [initValue, delay]);

  return debouncedValue;
}
