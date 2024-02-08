import Link from "next/link";
import { Metadata } from "next";
import { FaEdit, FaTrash, FaPlus, FaInfo } from "react-icons/fa";
import DeleteButton from "@/components/delete-btn";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Generated by create next app",
};

async function getTasks() {
  const res = await fetch("http://localhost:4000/api/task", {
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  // Recommendation: handle errors manually
  return res.json();
}

async function deleteTask(id: number) {
  const res = await fetch(`http://localhost:4000/api/task/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to delete task");
  }

  return res.json();
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function Task() {
  const res = await getTasks();
  // console.log("res: ", JSON.stringify(res, null, 2));

  async function handleDelete(id: number) {
    "use server";
    const res = await deleteTask(id);
    if (res) {
      revalidatePath("/task", "page");
    }
  }

  if (!res) {
    return <div>No data</div>;
  }

  if (res instanceof Error) {
    return <div>{res.message}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Todo app</h1>
      <Link href={"/task/create"} passHref>
        <button
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md shadow-md flex items-center justify-center mt-4 hover:bg-blue-600 w-full"
          aria-label="Create new task"
        >
          <FaPlus className="mr-2" />
          Add New Task
        </button>
      </Link>
      <ul className="mt-3 grid gap-5 ">
        {res.map((task: any) => (
          <li key={task.id} className="col-span-1 flex rounded-md shadow-lg">
            <div
              className={classNames(
                task.status === "ACTIVE" ? "bg-green-500" : "bg-red-500",
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {task.status === "ACTIVE" ? "Active" : "Completed"}
            </div>
            <div className="p-4 flex flex-col">
              <h2 className="font-bold">{task.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {task.description}
              </p>
            </div>
            <div>
              <Link href={`/task/${task.id}`} passHref>
                <button
                  className="text-blue-500 dark:text-blue-300 rounded-md p-2 hover:bg-blue-100 dark:hover:bg-blue-900"
                  aria-label="More info"
                >
                  <FaInfo />
                </button>
              </Link>
              <Link href={`/task/edit/${task.id}`} passHref>
                <button
                  className="text-blue-500 dark:text-blue-300 rounded-md p-2 hover:bg-blue-100 dark:hover:bg-blue-900"
                  aria-label="Edit task"
                >
                  <FaEdit />
                </button>
              </Link>
              <DeleteButton
                className="text-red-500 dark:text-red-300 rounded-md p-2 hover:bg-red-100 dark:hover:bg-red-900"
                aria-label="Delete task"
                handleClick={handleDelete}
                id={task.id}
              >
                <FaTrash />
              </DeleteButton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
