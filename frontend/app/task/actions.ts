"use server";

import { revalidatePath } from "next/cache";
import { Task } from "./create/page";

const apiUrl =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000/api/";
export async function createTask(data: Task) {
  // console.log(data);

  const res = await fetch(`${apiUrl}/task`, {
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
  const res = await fetch(`${apiUrl}/task/${id}`, {
    method: "GET",
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch task");
  }

  return res.json();
};
