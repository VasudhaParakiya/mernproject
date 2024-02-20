// import React from "react";

export default function InputField({
  id,
  label,
  placeholder,
  type,
  name,
  register,
  errorMessage,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label} :
      </label>

      <div className="">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...register}
          className="block w-full  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <span className="block w-full text-red-500 tetx-center">
        {errorMessage}
      </span>
    </div>
  );
}
