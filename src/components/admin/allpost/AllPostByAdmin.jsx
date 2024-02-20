import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Paginate from "../../pagination/Paginate";


const GET_ALL_POST_BY_ADMIN = gql`
  query GetAllPostByAdmin($input: paginateInput!) {
    getAllPostByAdmin(input: $input) {
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
        title
        description
        createdBy {
          firstName
        }
      }
    }
  }
`;


export default function AllPostByAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery(GET_ALL_POST_BY_ADMIN, {
    variables: {
      input: {
        limit: 5,
        page: currentPage,
      },
    },
  });
  // console.log("🚀 ~ AllPost ~ data:", data?.getAllPostByAdmin);
  const allPost = data?.getAllPostByAdmin.docs;
  const totalPages = data?.getAllPostByAdmin?.totalPages || 0;

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            All User
          </h2>
        </div>

        <table className="mt-3">
          <thead>
            <tr style={{ backgroundColor: "#ccc" }}>
              <th>Title</th>
              <th>Description</th>
              <th>FirstName</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {allPost?.map((post) => {
              return (
                <tr key={post?.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{post?.title}</td>
                  <td>{post?.description}</td>
                  <td>{post?.createdBy?.firstName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* { pageCount, onPageChange }  */}
        <Paginate pageCount={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
