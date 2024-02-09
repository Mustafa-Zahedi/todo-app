"use client";

import { Task } from "@/app/task/actions";

interface StatusButtonProps {
  id: number;
  task: Task;
  className?: string;
  handleClick: (id: number, task: Task) => void;
  children: React.ReactNode;
}

export default function StatusButton({
  id,
  task,
  className,
  handleClick,
  children,
}: StatusButtonProps) {
  return (
    <button className={className} onClick={() => handleClick(id, task)}>
      {children}
    </button>
  );
}
