import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatPostCreatedAt } from "../../utils/formateDate";
import Paginate from "../../pagination/Paginate";

import { useForm } from "react-hook-form";

const QUERY_ALL_USER = gql`
  query GetUsersByAdmin($input: paginateUserInput!) {
    getUsersByAdmin(input: $input) {
      totalDocs
      limit
      totalPages
      page
      nextPage
      prevPage
      hasNextPage
      hasPrevPage
      docs {
        id
        firstName
        lastName
        email
        active
        gender
        hobby
        role
        dateOfBirth
        isVerified
        profile
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_USER_BY_ADMIN = gql`
  mutation DeleteUserByAdmin($deleteUserByAdminId: String!) {
    deleteUserByAdmin(id: $deleteUserByAdminId) {
      message
    }
  }
`;

export default function AllUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState({ column: "createdAt", order: "asc" });

  const { data, refetch, error } = useQuery(QUERY_ALL_USER, {
    variables: {
      input: {
        limit: 5,
        page: currentPage,
        column: sortBy.column,
        order: sortBy.order,
        search: searchText,
      },
    },
    fetchPolicy: "network-only",
  });
  const [DeleteUserByAdmin] = useMutation(DELETE_USER_BY_ADMIN);

  // console.log("all User", data?.getUsersByAdmin);
  const allUser = data?.getUsersByAdmin?.docs;
  // console.log("🚀 ~ AllUser ~ allUser:", allUser);
  const totalPages = data?.getUsersByAdmin?.totalPages || 0;

  const handleSort = (column) => {
    setSortBy({
      column,
      order:
        sortBy.column === column
          ? sortBy.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const deleteUserHandler = async (id) => {
    try {
      await DeleteUserByAdmin({
        variables: {
          deleteUserByAdminId: id,
        },
      })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          refetch();
          toast.success("user deleted successfully");
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="text-right">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-2 me-2"
            autoComplete="false"
          />
        </div>

        {allUser ? (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                All User
              </h2>
            </div>

            <table className="mt-3">
              <thead>
                <tr>
                  <th onClick={() => handleSort("firstName")}>FirstName</th>
                  <th onClick={() => handleSort("lastName")}>LastName</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("gender")}>Gender</th>
                  <th onClick={() => handleSort("hobby")}>Hobby</th>
                  <th onClick={() => handleSort("dateOfBirth")}>DOB</th>
                  <th>Post</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUser?.map((user) => {
                  return (
                    <tr key={user?.id}>
                      <td>{user?.firstName}</td>
                      <td>{user?.lastName}</td>
                      <td>{user?.email}</td>
                      <td>{user?.gender}</td>
                      <td>{user?.hobby.join(" , ")}</td>
                      <td>{formatPostCreatedAt(user?.dateOfBirth)}</td>
                      <td>
                        <Link
                          to={`viewAllPostByUser/${user?.id}`}
                          className="inline-block underline decoration-1 text-indigo-600"
                        >
                          view Post
                        </Link>
                      </td>
                      <td>
                        {/* <Link to={`viewUser/${user?.id}`}>read</Link> */}
                        <Link
                          to={`signup/${user?.id}`}
                          className="mx-2 inline-block underline decoration-1 text-indigo-600"
                        >
                          edit
                        </Link>
                        <Link
                          to={"#"}
                          className="inline-block underline decoration-1 text-indigo-600"
                          onClick={() => deleteUserHandler(user?.id)}
                        >
                          delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          "No user data"
        )}
      </div>
      {/* { pageCount, onPageChange }  */}
      <Paginate pageCount={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
