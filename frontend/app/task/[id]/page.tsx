"use client";

import { useEffect, useState } from "react";
import { Task, getTask } from "../actions";

export default function Task({ params: { id } }: { params: { id: number } }) {
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    async function get() {
      const res = await getTask(+id);
      setTask(res);
    }
    get();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{task?.title}</h1>
      <p className="mb-4">{task?.description}</p>
      <p>{task?.deadline.toString()}</p>
      <p>{task?.status}</p>
    </div>
  );
}
