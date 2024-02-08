"use client";

import { useEffect, useState } from "react";
import { getTask } from "../actions";
import { TaskInputs } from "../create/page";

export default function Task({ params }: { params: { id: number } }) {
  const { id } = params;
  const [task, setTask] = useState<TaskInputs>();

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
      <p>{task?.deadline}</p>
      <p>{task?.status}</p>
    </div>
  );
}
