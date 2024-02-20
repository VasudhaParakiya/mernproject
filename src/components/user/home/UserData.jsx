import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPostCreatedAt } from "../../utils/formateDate";
import { useForm } from "react-hook-form";
import Button from "../../inputAllField/ButtonField";
import FileField from "../../inputAllField/ImageField";
import UploadProfile from "./UploadProfile";

const SINGLE_USER = gql`
  query MyProfile {
    myProfile {
      email
      firstName
      gender
      hobby
      id
      isVerified
      lastName
      password
      role
      dateOfBirth
      active
    }
  }
`;

export default function UserData() {
  const { loading, data, error, refetch } = useQuery(SINGLE_USER, {
    fetchPolicy: "network-only",
  });

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  const profile = data?.myProfile;

  if (loading) return <h1>loading...</h1>;
  if (error) return console.log(error);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Profile
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <UploadProfile />
        <h2>Name : {profile?.firstName + " " + profile?.lastName}</h2>
        <p>Email : {profile?.email}</p>
        <p>Gender : {profile?.gender}</p>
        <p>Hobby : {profile?.hobby.join(" , ")}</p>
        <p>DOB : {formatPostCreatedAt(profile?.dateOfBirth)}</p>

        {/* <Link
          to={`/user/signup/${profile?.id}`}
          className="underline decoration-1 text-indigo-600"
        >
          edit your profile
        </Link> */}
        <br />
        <Link
          to={"/user/changePassword"}
          className="underline decoration-1 text-indigo-600"
        >
          change password
        </Link>
      </div>
    </>
  );
}
