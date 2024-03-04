import React from "react";
import { Route, Routes } from "react-router";
import Login from "../login/login";
import ForgotPassword from "../login/ForgotPass";
import ConfirmPassword from "../login/ConfirmPassword";
import UpdateUserByAdmin from "../user/updateByAdmin/UpdateUserByAdmin";
import SignUp from "../registration/SignUp";
import Verify from "../registration/Verify";
import Home from "../home/Home";
import ExpireMsg from "../registration/expireMsg";
import authTokenForRoutes from "../auth/authTokenForRoutes";

export default function PublicRoutes() {
  const authToken = authTokenForRoutes();
  return (
    !authToken && (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    )
  );
}
