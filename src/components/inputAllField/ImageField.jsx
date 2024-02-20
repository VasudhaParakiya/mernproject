// import React from "react";

export default function FileField({
  id,
  name,
  type,
  register,
  errorMessage,
  ...props
}) {
  return (
    <div className="mt-3 d-flex flex-column">
      <input
        id={id}
        type={type}
        name={name}
        accept="*/*"
        {...register}
        {...props}
        // ref={register}
        // // {...register}
        // onChange={handleFileInputChange}
      />
      <span style={{ color: "red" }}>{errorMessage}</span>
    </div>
  );
}
