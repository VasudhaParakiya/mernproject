import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../../pagination/Paginate";
import Pagination from "../../pagination/Pagination";

const QUERY_ALL_POST = gql`
  query Docs($input: paginateInput!) {
    getAllPost(input: $input) {
      docs {
        title
        id
        description
        createdBy {
          firstName
        }
      }
      hasNextPage
      hasPrevPage
      limit
      nextPage
      page
      prevPage
      totalDocs
      totalPages
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      message
    }
  }
`;

export default function AllPost() {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { loading, data, refetch, error } = useQuery(QUERY_ALL_POST, {
    variables: {
      input: {
        limit: limit,
        page: currentPage,
      },
    },
    fetchPolicy: "network-only",
  });

  const [DeletePost] = useMutation(DELETE_POST);

  // useEffect(() => {
  //   refetch(); // Ensure data is fetched when component mounts
  // }, []);

  // console.log("🚀 ~ AllPost ~ data:", data);
  const allPost = data?.getAllPost?.docs;
  console.log("🚀 ~ AllPost ~ allPost:", allPost?.length);
  const totalPages = data?.getAllPost?.totalPages || 0;

  // Function to handle page change
  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  // delete post
  const deletePostData = async (id) => {
    try {
      const isConfirm = window.confirm("sure, are you went to delete???");
      if (isConfirm) {
        await DeletePost({
          variables: {
            deletePostId: id,
          },
        })
          .then((res) => {
            // console.log("🚀 ~ .then ~ res:", res);
            refetch();
            toast.success("post delete successfully");
          })
          .catch((error) => {
            console.log(error.message);
            toast.error(error.message);
          });
      }
    } catch (error) {
      // console.log("deletePostData", error.message);
      toast.error(error.message);
    }
    // {
    //     "deletePostId": null
    //   }
  };

  if (error) {
    console.log("🚀 ~ AllPost ~ error:", error);
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex justify-end">
          <Link
            to="createPost"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + Post
          </Link>
        </div>
        {allPost?.length ? (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {data?.getAllPost ? "Post Data" : " No Post Added"}
              </h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allPost?.map((post) => {
                  return (
                    <tr key={post?.id}>
                      <td>{post?.title}</td>
                      <td>{post?.description}</td>
                      <td>{post?.createdBy?.firstName}</td>
                      <td>
                        <Link to={`updatePost/${post?.id}`} className="me-2">
                          edit
                        </Link>
                        <Link to={"#"} onClick={() => deletePostData(post?.id)}>
                          delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          "No post add"
        )}{" "}
      </div>
    </>
  );
}
