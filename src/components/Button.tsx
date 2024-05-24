import { MouseEventHandler } from 'react';

export function Button({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}) {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button onClick={handleOnClick} className={className}>
      {children}
    </button>
  );
}
