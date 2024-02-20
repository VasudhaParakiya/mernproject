import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import InputField from "../inputAllField/InputField";
import Button from "../inputAllField/ButtonField";
import { toast } from "react-toastify";

const CONFIRM_PASSWORD = gql`
  mutation ConfirmPassword($input: confirmPasswordInput!, $token: String!) {
    confirmPassword(input: $input, token: $token) {
      id
      firstName
      email
      lastName
      password
    }
  }
`;

export default function ConfirmPassword() {
  const { token } = useParams();
  // console.log("🚀 ~ ConfirmPassword ~ token:", token);
  const navigate = useNavigate();

  const [ConfirmPassword] = useMutation(CONFIRM_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const formSubmit = (data) => {
    console.log("🚀 ~ ConfirmPassword ~ data:", data);
    try {
      ConfirmPassword({
        variables: {
          input: { ...data },
          token: token,
        },
      })
        .then((res) => {
          console.log(res);
          navigate("/login");
          toast.success("password change successfully");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("🚀 ~ formSubmit ~ error:", error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            confirm Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
          >
            {/* new password  */}
            <InputField
              id="newPassword"
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="New Password..."
              register={{
                ...register("newPassword", {
                  required: "New Password is required",
                }),
              }}
              errorMessage={errors?.newPassword?.message}
            />

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password..."
              register={{
                ...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                }),
              }}
              errorMessage={errors?.confirmPassword?.message}
            />

            <Button
              className={
                "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }
              type={"submit"}
              btnName={"Submit"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
