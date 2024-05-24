import { useState } from 'react';
import { Button } from './Button';

export function ListContainer({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="container">
      <Button className="toggle-btn" onClick={() => setOpen(o => !o)}>
        {open ? '–' : '+'}
      </Button>

      {open && children}
    </div>
  );
}
