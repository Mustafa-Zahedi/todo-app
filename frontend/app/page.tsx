import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <ul className="flex">
        <li className="mr-4">
          <Link href="/task">Task</Link>
        </li>
        <li>
          <Link href="/user">User</Link>
        </li>
      </ul>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
    </div>
  );
}
