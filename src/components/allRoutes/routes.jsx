import { Route, Routes, useNavigate } from "react-router";
import Login from "../login/login";

import SignUp from "../registration/SignUp";
import ForgotPassword from "../login/ForgotPass";
import Verify from "../registration/Verify";

// import UserData from "../user/home/UserData";
// import Post from "../user/post/Post";
// import AllPost from "../user/post/AllPost";/

// import AllUser from "../admin/home/AllUser";
import PageNotFound from "../4o4Page/PageNotFound";
// import ViewUser from "../admin/home/ViewUser";
// import ViewAllPostByUser from "../admin/home/ViewAllPostByUser";
// import AllPostByAdmin from "../admin/allpost/AllPostByAdmin";
// import ChangePassword from "../login/ChangePassword";
import ConfirmPassword from "../login/ConfirmPassword";
// import HomePage from "../user/home/HomePage";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import UpdateUserByAdmin from "../user/updateByAdmin/UpdateUserByAdmin";
// import authTokenForRoutes from "../auth/authTokenForRoutes";
// import { useEffect, useState } from "react";
import UserProtected from "../protected/UserAuth";
import PublicRoutes from "./PublicRoutes";
import Home from "../home/Home";
import AllUser from "../admin/home/AllUser";
import ViewAllPostByUser from "../admin/home/ViewAllPostByUser";
import UserData from "../user/home/UserData";
import AllPostByAdmin from "../admin/allpost/AllPostByAdmin";
import AllPost from "../user/post/AllPost";
import Post from "../user/post/Post";
import ChangePassword from "../login/ChangePassword";
import authTokenForRoutes from "../auth/authTokenForRoutes";
import ExpireMsg from "../registration/expireMsg";

const AllRoutes = () => {
  // const authToken = authTokenForRoutes();

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/forgotPassword/:token" element={<ConfirmPassword />} /> */}
        {/* <Route
          path="/updateUserByAdmin/:token"
          element={<UpdateUserByAdmin />}
        /> */}
        {/* <Route path="/loginVerify/:token" element={<Verify />} />
        <Route path="/expireMsg" element={<ExpireMsg />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userVerify/:token" element={<Verify />} /> */}
        {/* <Route path="/signup/:id" element={<SignUp />} /> */}

        {/*---------------- user routes-----------------------  */}
        {/* {authToken && ( */}
        {/* <Route path="/user">
          <Route index element={<AllPost />} />
          <Route path="createPost" element={<Post />} />
          <Route path="updatePost/:id" element={<Post />} />
          <Route path="profile" element={<UserData />} />
          <Route path="userProfile/:id" element={<SignUp />} />
          <Route path="changePassword" element={<ChangePassword />} /> */}
        {/* <Route path="*" element={<PageNotFound />} /> */}
        {/* </Route> */}
        {/* )} */}

        {/*------------------ admin routes------------------------------ */}
        {/* {authToken && ( */}
        {/* <Route path="/admin">
          <Route index element={<AllUser />} />
          <Route path="updateUser/:id" element={<SignUp />} /> */}
        {/* <Route path="viewUser/:id" element={<ViewUser />} /> */}
        {/* <Route path="viewAllPostByUser/:id" element={<ViewAllPostByUser />} />
          <Route path="profile" element={<UserData />} />
          <Route path="allPostByAdmin" element={<AllPostByAdmin />} />
          <Route path="*" element={<PageNotFound />} />
        </Route> */}
        {/* )} */}

        <Route path="*" element={<PublicRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/forgotPassword/:token" element={<ConfirmPassword />} />
        <Route path="/loginVerify/:token" element={<Verify />} />
        <Route path="/expireMsg" element={<ExpireMsg />} />
        <Route path="/userVerify/:token" element={<Verify />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
