import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { formatPostCreatedAt } from "../../utils/formateDate";

const GET_INFO_UPDATE_BY_ADMIN = gql`
  query GetInfoUpdatedByAdmin($token: String) {
    getInfoUpdatedByAdmin(token: $token) {
      firstName
      lastName
      hobby
      gender
      dateOfBirth
      active
    }
  }
`;

export default function UpdateUserByAdmin() {
  const { token } = useParams();
  console.log("🚀 ~ UpdateUserByAdmin ~ token:", token);

  const { data } = useQuery(GET_INFO_UPDATE_BY_ADMIN, {
    variables: {
      token: token,
    },
  });
  //   console.log(data);
  const userData = data?.getInfoUpdatedByAdmin;
  console.log("🚀 ~ UpdateUserByAdmin ~ userData:", userData);

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          your information update by admin
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p>FirstName : {userData?.firstName}</p>
        <p>LastName : {userData?.lastName}</p>
        <p>Gender : {userData?.gender}</p>
        <p>Hobby : {userData?.hobby.join(" , ")}</p>
        <p>Date : {formatPostCreatedAt(userData?.dateOfBirth)}</p>
        <p>Active : {userData?.active ? "true" : "false"}</p>
      </div>
    </div>
  );
}
