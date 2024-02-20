import { gql, useMutation } from "@apollo/client";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

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

  //   const [isVerified, setIsVerifird] = useState(false);
  const [VerifyUser] = useMutation(VERIFIED_USER);

  const handleVerified = async (e) => {
    e.preventDefault();
    // const response = await VerifyUser({
    //   variables: {
    //     token: token,
    //   },
    // });
    // console.log(response.data.verifyUser.isVerified);

    // const isVerified = response.data.verifyUser.isVerified;
    // if (isVerified === true) navigate("/login");

    VerifyUser({
      variables: {
        token: token,
      },
    })
      .then((res) => {
        console.log(res.data.verifyUser.isVerified);
        const isVerified = res.data.verifyUser.isVerified;
        if (isVerified === true) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Are You Verify ???
          </h2>
        </div>
        <div className="flex justify-center w-64">
          <button
            type="submit"
            className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleVerified}
          >
            verify
          </button>
        </div>
      </div>
    </>
  );
};

export default Verify;
