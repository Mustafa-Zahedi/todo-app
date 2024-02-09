export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <main className="flex flex-col items-center p-10 h-fit w-full bg-gray-200 dark:bg-gray-600 shadow-md dark:shadow-none rounded-lg">
        {children}
      </main>
    </div>
  );
}
