"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, createUser, getUser, updateUser } from "@/app/user/actions";
import { formatDateToYyyyMmDd } from "@/app/utils/date-format";

const schema = yup.object().shape({
  fullname: yup.string().required(),
  // password: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().oneOf(["ADMIN", "USER"]).default("USER").required(),
});

export default function EditUser({
  params: { id },
}: {
  params: { id: number };
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const user = await getUser(+id);
      // console.log(user);
      return {
        // ...user,
        fullname: user?.fullname,
        email: user?.email,
        role: user?.role || "USER",
      };
    },
  });
  const onSubmit: SubmitHandler<User> = async (data) => {
    // console.log(data);
    const res = await updateUser(id, {
      ...data,
    });
    if (res) {
      router.push(`/user/${res.id}`);
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
          htmlFor="fullname"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Fullname
        </label>
        <input
          className="block dark:bg-gray-700  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="test"
          {...register("fullname")}
        />

        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.fullname?.message}</span>}
        </p>
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Deadline
        </label>
        <input
          type="date"
          className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("email")}
        />
        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.email?.message}</span>}
        </p>
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="role"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Role
        </label>
        <select
          className="dark:bg-gray-700 block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("role")}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
        <p className="mt-2 text-sm text-red-600">
          {<span>{errors?.role?.message}</span>}
        </p>
      </div>

      <input
        className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md shadow-md flex items-center justify-center mt-4 hover:bg-blue-600 w-full"
        type="submit"
      />
    </form>
  );
}
