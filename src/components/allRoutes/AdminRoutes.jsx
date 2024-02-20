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
// import UserProtected from "../protected/UserAuth";

export default function AdminRoutes() {
  const authTokenAdmin = authTokenForRoutes();

  return (
    authTokenAdmin && (
      <Routes>
        <Route path="/" element={<AllUser />} />
        <Route path="signup/:id" element={<SignUp />} />
        {/* <Route path="viewUser/:id" element={<ViewUser />} /> */}
        <Route path="viewAllPostByUser/:id" element={<ViewAllPostByUser />} />
        <Route path="profile" element={<UserData />} />
        <Route path="allPostByAdmin" element={<AllPostByAdmin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  );
}

// export default function UserRoutes() {
//   const authToken = authTokenForRoutes();
//   // const role = JSON.parse(localStorage.getItem("role"));
//   // console.log("🚀 ~ UserRoutes ~ role:", role);

//   return (
//     authToken && (
//       <Routes>
//         <Route path="/" element={<AllPost />} />
//         <Route path="createPost" element={<Post />} />
//         <Route path="createPost/:id" element={<Post />} />
//         <Route path="profile" element={<UserData />} />
//         <Route path="changePassword" element={<ChangePassword />} />
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     )
//   );
// }

// return (
//   authTokenAdmin && (
//     <Routes>
//       {/* <Route path="/" element={<UserProtected component={AllPost} />} /> */}
//       <Route exact path="/" element={<AllUser />} />
//       <Route exact path="signup/:id" element={<SignUp />} />
//       <Route exact path="viewUser/:id" element={<ViewUser />} />
//       <Route
//         exact
//         path="viewAllPostByUser/:id"
//         element={<ViewAllPostByUser />}
//       />
//       <Route path="profile" element={<UserData />} />
//       <Route exact path="allPostByAdmin" element={<AllPostByAdmin />} />
//       <Route path="*" element={<PageNotFound />} />
//     </Routes>
//   )
// );
