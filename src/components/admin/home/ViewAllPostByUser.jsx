import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Paginate from "../../pagination/Paginate";

const ALL_POST_OF_ONE_USER = gql`
  query GetAllPostOneUserByAdmin(
    $input: paginateInput!
    $getAllPostOneUserByAdminId: ID!
  ) {
    getAllPostOneUserByAdmin(input: $input, id: $getAllPostOneUserByAdminId) {
      totalDocs
      limit
      totalPages
      page
      docs {
        createdBy {
          firstName
        }
        title
        id
        description
      }
    }
  }
`;

export default function ViewAllPostByUser() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery(ALL_POST_OF_ONE_USER, {
    variables: {
      getAllPostOneUserByAdminId: id,
      input: {
        limit: 5,
        page: currentPage,
      },
    },
  });
  console.log("🚀 ~ ViewAllPostByUser ~ data:", data?.getAllPostOneUserByAdmin);
  const postData = data?.getAllPostOneUserByAdmin.docs;
  const totalPages = data?.getAllPostOneUserByAdmin?.totalPages || 0;

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <div className="mt-4 flex flex justify-end">
        <Link
          to="/admin"
          className="rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back
        </Link>
      </div>
      {postData?.length ? (
        <>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {postData?.length ? "Post Data" : " No Post Added By User"}
              </h2>
            </div>

            <table className="mt-3">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {postData?.map((post) => {
                  return (
                    <tr key={post?.id}>
                      <td>{post?.title}</td>
                      <td>{post?.description}</td>
                      <td>{post?.createdBy?.firstName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Paginate pageCount={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      ) : (
        <h1 className="mt-3">no post data</h1>
      )}
    </>
  );
}
