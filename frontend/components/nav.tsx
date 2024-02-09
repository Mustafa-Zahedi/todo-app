import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="p-4 border-y flex justify-start mb-10">
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
    </nav>
  );
}
