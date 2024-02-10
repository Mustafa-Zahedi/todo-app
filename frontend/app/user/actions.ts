"use server";

import { revalidatePath } from "next/cache";

export type User = {
  id?: number;
  fullname: string;
  email: string;
  password?: string;
  role: "ADMIN" | "USER";
};

const apiUrl =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000/api/";
export async function createUser(data: User) {
  // console.log(data);

  const res = await fetch(`${apiUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  revalidatePath("/user", "page");
  return res.json();
}

export async function updateUser(id: number, data: User) {
  // console.log(data);

  const res = await fetch(`${apiUrl}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  revalidatePath("/user", "page");
  return res.json();
}

export const getUser = async (id: number): Promise<User> => {
  const res = await fetch(`${apiUrl}/user/${id}`, {
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};
