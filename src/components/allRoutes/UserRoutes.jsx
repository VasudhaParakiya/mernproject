import React from "react";
import { Route, Routes } from "react-router";
import authTokenForRoutes from "../auth/authTokenForRoutes";
import AllPost from "../user/post/AllPost";
import Post from "../user/post/Post";
import UserData from "../user/home/UserData";
import ChangePassword from "../login/ChangePassword";
import PageNotFound from "../4o4Page/PageNotFound";
// import UserProtected from "../protected/UserAuth";

export default function UserRoutes() {
  const authToken = authTokenForRoutes();
  return (
    authToken && (
      <Routes>
        <Route path="/" element={<AllPost />} />
        <Route path="createPost" element={<Post />} />
        <Route path="createPost/:id" element={<Post />} />
        <Route path="profile" element={<UserData />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  );
}
