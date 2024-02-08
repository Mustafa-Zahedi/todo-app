import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid justify-items-center min-h-screen p-10">
      <main className="flex flex-col items-center p-10 h-fit w-fit min-w-max bg-gray-200 dark:bg-gray-600 shadow-md dark:shadow-none rounded-lg">
        {children}
      </main>
    </div>
  );
}
