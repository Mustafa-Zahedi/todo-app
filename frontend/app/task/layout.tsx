export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid justify-items-center min-h-screen p-10">
      <main className="flex flex-col items-center p-10 h-fit lg:w-4/12 md:w-6/12 w-full bg-gray-200 dark:bg-gray-600 shadow-md dark:shadow-none rounded-lg">
        {children}
      </main>
    </div>
  );
}
