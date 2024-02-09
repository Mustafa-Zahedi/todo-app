"use client";

import { useEffect, useState } from "react";
import { User, getUser } from "../actions";

export default function User({ params: { id } }: { params: { id: number } }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function get() {
      const res = await getUser(+id);
      setUser(res);
    }
    get();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{user?.fullname}</h1>
      <p className="mb-4">{user?.email}</p>
      <p>{user?.role}</p>
    </div>
  );
}
