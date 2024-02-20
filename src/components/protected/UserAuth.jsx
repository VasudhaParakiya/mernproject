import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function UserProtected(props) {
  let Component = props.component;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = JSON.parse(localStorage.getItem("role"));
    console.log("🚀 ~ useEffect ~ role:", role, typeof role);

    if (!token || !role) {
      navigate("/");
    } else if (token && role === "user") {
      navigate("/user");
    } else if (token && role === "admin") {
      navigate("/admin");
    }
  }, [navigate]);

  return <>{<Component />}</>;
}
