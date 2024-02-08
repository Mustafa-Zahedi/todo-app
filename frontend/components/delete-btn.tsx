"use client";

interface DeleteButtonProps {
  id: number;
  className?: string;
  handleClick: (id: number) => void;
  children: React.ReactNode;
}

export default function DeleteButton({
  id,
  className,
  handleClick,
  children,
}: DeleteButtonProps) {
  return (
    <button className={className} onClick={() => handleClick(id)}>
      {children}
    </button>
  );
}
