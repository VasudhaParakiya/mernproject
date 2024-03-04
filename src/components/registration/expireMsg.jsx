import { gql, useMutation } from "@apollo/client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SEND_NEW_LINK = gql`
  mutation TokenExpireAndSendLink($email: String) {
    tokenExpireAndSendLink(email: $email) {
      isVerified
    }
  }
`;

export default function ExpireMsg() {
  const { register, handleSubmit } = useForm();
  const [TokenExpireAndSendLink] = useMutation(SEND_NEW_LINK);
  const navigate = useNavigate();
  const [genarate, setGenerate] = useState(false);

  const formSubmit = (data) => {
    console.log("🚀 ~ formSubmit ~ data:", data);
    try {
      TokenExpireAndSendLink({
        variables: {
          email: data.email,
        },
      })
        .then((res) => {
          console.log("🚀 ~ formSubmit ~ res:", res);
          toast.success("please verify ");
        })
        .catch((error) => {
          console.log("🚀 ~ formSubmit ~ error:", error);
        });
    } catch (error) {
      console.log("🚀 ~ formSubmit ~ error:", error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="mt-10">
      <p> your token is Expire.</p>
      <p>please regenrate new link.</p>
      <div className="mt-4">
        <button
          className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold me-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBack}
        >
          back
        </button>
        <button
          className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setGenerate(true)}
        >
          regenrate
        </button>
      </div>
      {genarate && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-left"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email..."
                  className="block w-full  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email")}
                />
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  regenarate
                </button>
              </div>
              {/* <span className="block w-full text-red-500 tetx-center">
                {errors?.firstName?.message}
              </span> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
