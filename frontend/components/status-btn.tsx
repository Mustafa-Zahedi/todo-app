"use client";

import { Task } from "@/app/task/actions";

interface StatusButtonProps {
  id: number;
  task: Task;
  className?: string;
  disabled?: boolean;
  handleClick: (id: number, task: Task) => void;
  children: React.ReactNode;
}

export default function StatusButton({
  id,
  task,
  className,
  handleClick,
  disabled,
  children,
}: StatusButtonProps) {
  return (
    <button
      disabled={disabled}
      className={className}
      onClick={() => handleClick(id, task)}
    >
      {children}
    </button>
  );
}
