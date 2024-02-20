// import React from "react";

 export default function SelectFiled({
  label,
  id,
  name,
  options,
  register,
  errorMessage,
}) {
  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor={id}>{label} :</label>
      <select id={id} name={name} {...register}>
        {options.map((option, i) => {
          return <option key={i}>{option}</option>;
        })}
      </select>
      <span style={{ color: "red" }}>{errorMessage}</span>
    </div>
   );
 }
