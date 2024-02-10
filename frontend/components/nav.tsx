import { decodeJwt } from "@/utils/decode-jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Navbar() {
  const session = cookies().get("currentUser")?.value;
  const { user } = session ? decodeJwt(session) : null || {};
  return (
    <nav className="flex justify-between items-center border-b mb-24 p-2">
      <ul className="flex items-center gap-5">
        <li>
          <Link href="/task" className="text-white">
            Task
          </Link>
        </li>
        <li>
          <Link href="/user" className="text-white">
            User
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-5">
        <li>{user?.email}</li>
        {user && (
          <li>
            <form
              action={async () => {
                "use server";
                cookies().delete("currentUser");
                redirect("/login");
              }}
            >
              <button>Logout</button>
            </form>
          </li>
        )}
      </ul>
    </nav>
  );
}
