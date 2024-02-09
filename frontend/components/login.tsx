"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const apiUrl =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000/api/";

async function login(params: { email: string; password: string }) {
  const res = await fetch(`${apiUrl}/user/login`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    // console.log(data);
    const res = await login({ ...data });
    if (res) {
      if (res.error) {
        console.log("login: ", res.error);
      } else {
        // console.log("login: ", res);
        localStorage.setItem("token", res.token);
        router.push(`/task`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
          >
            Email
          </label>
          <input
            className="block dark:bg-gray-700  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="test"
            {...register("email")}
          />

          <p className="mt-2 text-sm text-red-600">
            {<span>{errors?.email?.message}</span>}
          </p>
        </div>
        <div className="mb-4 flex flex-col">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
          >
            Password
          </label>
          <input
            className="block dark:bg-gray-700  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="test"
            {...register("password")}
          />

          <p className="mt-2 text-sm text-red-600">
            {<span>{errors?.password?.message}</span>}
          </p>
        </div>
        <input
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md shadow-md flex items-center justify-center mt-4 hover:bg-blue-600 w-full"
          type="submit"
        />
      </form>
    </div>
  );
}
