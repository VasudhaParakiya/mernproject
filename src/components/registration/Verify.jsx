import { gql, useMutation } from "@apollo/client";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const VERIFIED_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      isVerified
    }
  }
`;

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log("🚀 ~ Verify ~ token:", token);
  let isVerified;
  //   const [isVerified, setIsVerifird] = useState(false);
  const [VerifyUser, { loading, data, error }] = useMutation(VERIFIED_USER);
  // console.log("🚀 ~ Verify ~ data:", data);
  // console.log("🚀 ~ Verify ~ error ~ error:", error);

  useEffect(() => {
    try {
      VerifyUser({
        variables: {
          token: token,
        },
      })
        .then((res) => {
          console.log(res.data.verifyUser.isVerified);
          isVerified = res.data.verifyUser.isVerified;
          toast.success("verify successfully. please login");
          // if (isVerified === true) navigate("/login");
        })
        .catch((err) => {
          console.log("🚀 ~ handleVerified ~ err:", err.message);
          if (err.message === "jwt expired") {
            navigate("/expireMsg");
          }
          toast.error("jwt expired");
        });
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);

      console.log(error.message);
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {data && (
          <>
            <p>your verification successfully.</p>
            <p>please login</p>
            <button
              type="submit"
              className="bg-indigo-600 inline-block mt-4 text-white hover:bg-indigo-500 me-3 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              onClick={handleClick}
            >
              login
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Verify;
