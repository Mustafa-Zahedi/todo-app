"use server";

import { revalidatePath } from "next/cache";
import { TaskInputs } from "./create/page";

export async function createTask(data: TaskInputs) {
  const res = await fetch("http://localhost:4000/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  revalidatePath("/task", "page");
  return res.json();
}

export const getTask = async (id: number) => {
  const res = await fetch(`http://localhost:4000/api/task/${id}`, {
    method: "GET",
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch task");
  }

  return res.json();
};
