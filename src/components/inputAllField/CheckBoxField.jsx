// import React from "react";

export default function CheckField({
  type,
  name,
  checkValue,
  register,
  label,
  errorMessage,
}) {
  return (
    <>
      <div className="d-flex">
        <label className="w-25">{label} :</label>
        {checkValue.map((value, i) => {
          return (
            <div key={i} className="w-25">
              <input
                type={type}
                name={name}
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
