import React from "react";
import InputField from "../inputAllField/InputField";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "../inputAllField/ButtonField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const QUERY_CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: changePassword!) {
    changePassword(input: $input) {
      email
      firstName
      lastName
      password
    }
  }
`;

export default function ChangePassword() {
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));
  
  const [ChangePassword] = useMutation(QUERY_CHANGE_PASSWORD);
  // console.log("🚀 ~ ChangePassword ~ data:", data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    // console.log("🚀 ~ formSubmit ~ data:", data);
    try {
      ChangePassword({
        variables: {
          input: { ...data },
        },
      })
        .then((res) => {
          console.log(res);

          // navigate("/user/profile");
          navigate(`/${role}/profile`);

          toast.success("password change successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } catch (error) {
      console.log("change password fail", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
          >
            {/* old password  */}
            <InputField
              id="oldPassword"
              name="oldPassword"
              type="password"
              label="Old Password"
              placeholder="Old Password..."
              register={{
                ...register("oldPassword", {
                  required: "Old Password is required",
                }),
              }}
              errorMessage={errors?.oldPassword?.message}
            />

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

            <Button
              className={
                "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }
              type={"submit"}
              btnName={"change password"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
