import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";

const GET_SINGLE_USER_BY_ADMIN = gql`
  query GetSingleUserByAdmin($getSingleUserByAdminId: ID!) {
    getSingleUserByAdmin(id: $getSingleUserByAdminId) {
      id
      firstName
      lastName
      email
      password
      active
      gender
      hobby
      role
      dateOfBirth
      isVerified
    }
  }
`;

export default function ViewUser() {
  const { id } = useParams();
  const { data } = useQuery(GET_SINGLE_USER_BY_ADMIN, {
    variables: {
      getSingleUserByAdminId: id,
    },
  });
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Image
        </h2>
      </div>
      <div>
        {/* <h2>{profile.firstName + " " + profile.lastName}</h2>
        <h5>{profile.email}</h5> */}
        {/* <h1>posts</h1> */}
      </div>
    </>
  );
}
