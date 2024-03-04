import React from "react";
import authTokenForRoutes from "../auth/authTokenForRoutes";
import { Route, Routes } from "react-router";
import AllUser from "../admin/home/AllUser";
import SignUp from "../registration/SignUp";
// import ViewUser from "../admin/home/ViewUser";
import ViewAllPostByUser from "../admin/home/ViewAllPostByUser";
import AllPostByAdmin from "../admin/allpost/AllPostByAdmin";
import PageNotFound from "../4o4Page/PageNotFound";
import UserData from "../user/home/UserData";
import ChangePassword from "../login/ChangePassword";
// import UserProtected from "../protected/UserAuth";

export default function AdminRoutes() {
  const authTokenAdmin = authTokenForRoutes();

  return (
    authTokenAdmin && (
      <Routes>
        <Route index element={<AllUser />} />
        <Route path="updateUser/:id" element={<SignUp />} />
        {/* <Route path="viewUser/:id" element={<ViewUser />} /> */}
        <Route path="viewAllPostByUser/:id" element={<ViewAllPostByUser />} />
        <Route path="profile" element={<UserData />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="allPostByAdmin" element={<AllPostByAdmin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  );
}
