// import React from "react";

export default function RadioButton({
  id,
  type,
  name,
  radioGender,
  register,
  label,
  errorMessage,
}) {
  return (
    <>
      <div className="d-flex mt-3">
        <label htmlFor={id} className="w-25">
          {label} :
        </label>
        {radioGender.map((value, i) => {
          return (
            <div key={i} className="w-25">
              <input
                type={type}
                name={name}
                id={id}
                value={value}
                {...register}
                className="me-2"
              />
              {value}
            </div>
          );
        })}
      </div>
      <span style={{ color: "red" }}>{errorMessage}</span>
    </>
  );
}
