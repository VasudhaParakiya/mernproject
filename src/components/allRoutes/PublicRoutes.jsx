import React from "react";
import { Route, Routes } from "react-router";
import Login from "../login/login";
import ForgotPassword from "../login/ForgotPass";
import ConfirmPassword from "../login/ConfirmPassword";
import UpdateUserByAdmin from "../user/updateByAdmin/UpdateUserByAdmin";
import SignUp from "../registration/SignUp";
import Verify from "../registration/Verify";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/forgotPassword/:token" element={<ConfirmPassword />} />
      <Route path="/updateUserByAdmin/:token" element={<UpdateUserByAdmin />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/:token" element={<Verify />} />
    </Routes>
  );
}
