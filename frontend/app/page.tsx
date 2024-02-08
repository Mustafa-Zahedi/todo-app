import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 p-4">
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
          <li className="mr-4">
            <Link href="/about" className="text-white">
              About
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/contact" className="text-white">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-grow flex flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg">
          Your go-to destination for tasks and user information.
        </p>
      </div>
    </div>
  );
}
