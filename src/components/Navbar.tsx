import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useListenKey } from '../hooks/useListenKey';

export function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="navbar">
      <ul>
        <Logo />
        {children}
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <li className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </li>
  );
}

export function Search({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 1000);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  useListenKey('Enter', () => {
    if (document.activeElement === inputEl.current) return;

    inputEl.current?.focus();
  });

  const handleSubmitSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query.trim());
    }
  };

  return (
    <li className="search">
      <input
        ref={inputEl}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
        onKeyDown={handleSubmitSearch}
      />
    </li>
  );
}

export function NumResults({ num }: { num: number | string }) {
  return (
    <li className="num-results">
      <p>
        Found <b>{num}</b> movies
      </p>
    </li>
  );
}
