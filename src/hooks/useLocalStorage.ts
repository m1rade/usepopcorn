import { useEffect, useState } from 'react';

export function useLocalStorage<S>(initialState: S, key: string): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
