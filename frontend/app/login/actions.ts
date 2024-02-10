"use server";

import { cookies } from "next/headers";

const apiUrl =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000/api/";

export async function login(params: { email: string; password: string }) {
  const res = await fetch(`${apiUrl}/user/login`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("login data: ", data);

  if (res.status === 200) {
    cookies().set("currentUser", data.token);
    return data;
  }
}
