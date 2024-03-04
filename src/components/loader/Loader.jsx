import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Loader element */}
      <div className="spinner border-t-4 border-b-4 border-gray-900 rounded-full w-12 h-12"></div>
    </div>
  );
}
