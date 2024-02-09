"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTask } from "@/app/task/actions";

export type Task = {
  title: string;
  description: string;
  deadline: Date;
  status: "ACTIVE" | "INACTIVE";
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).max(2048).required(),
  deadline: yup.date().required(),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).required(),
});

export default function CreateTask() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Task>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Task> = async (data) => {
    // console.log(data);
    const res = await createTask({ ...data, status: "ACTIVE" });
    if (res) {
      router.push(`/task/${res.id}`);
    }
  };

  // console.log(watch("title")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="flex flex-col w-full m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Title
        </label>
        <input
          className="block dark:bg-gray-700  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="test"
          {...register("title")}
        />

        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.title?.message}</span>}
        </p>
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Description
        </label>
        <textarea
          rows={5}
          className="block dark:bg-gray-700 w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("description", { required: true })}
        />
        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.description?.message}</span>}
        </p>
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Deadline
        </label>
        <input
          type="date"
          className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("deadline", { required: true })}
        />
        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.deadline?.message}</span>}
        </p>
      </div>

      <input
        className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md shadow-md flex items-center justify-center mt-4 hover:bg-blue-600 w-full"
        type="submit"
      />
    </form>
  );
}
