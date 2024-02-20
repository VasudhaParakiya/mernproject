import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function authTokenForRoutes() {
  const [authToken, setAuthToken] = useState();
  // console.log("🚀 ~ PrivateRoute ~ authToken:", authToken);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = JSON.parse(localStorage.getItem("role"));

    if (token && role === "user") {
    
      setAuthToken(token);
      navigate("/user");
    } else if (token && role === "admin") {
      setAuthToken(token);
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);
  return authToken;
}

export default authTokenForRoutes;
