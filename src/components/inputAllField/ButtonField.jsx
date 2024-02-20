// import React from "react";

export default function Button({ className, btnName, type }) {
  return (
    <div className="mt-2">
      <button type={type} className={className}>
        {btnName}
      </button>
    </div>
  );
}
