// import React from 'react'
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      id
    }
  }
`;

const ForgotPassword = () => {
  const [ForgotPassword] = useMutation(FORGOT_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    console.log("🚀 ~ formSubmit ~ data:", data);
    try {
      ForgotPassword({
        variables: {
          email: data.email,
        },
      })
        .then((res) => {
          console.log("🚀 ~ formSubmit ~ res:", res.data);
          toast.success("please check your email and verify");
        })
        .catch((err) => {
          // console.log("🚀 ~ formSubmit ~ err:", err.message);
          toast.error(err.message);
        });
    } catch (error) {
      // console.log("🚀 ~ formSubmit ~ error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          forgot password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.email?.message}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              forgate password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
