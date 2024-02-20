import React from "react";

export default function Home() {
  // const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role"));
  return <h1>Welcom to home page {role ? `${role}` : ""}</h1>;
}
