import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import InputField from "../../inputAllField/InputField";
import Button from "../../inputAllField/ButtonField";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const CREATE_POST = gql`
  mutation CreatePost($input: createPostInput!) {
    createPost(input: $input) {
      id
      title
      description
      createdBy
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($input: updatePostInput!, $updatePostId: ID!) {
    updatePost(input: $input, id: $updatePostId) {
      title
      description
      createdBy
    }
  }
`;

const QUERY_SINGLE_POST = gql`
  query GetSinglePost($getSinglePostId: ID!) {
    getSinglePost(id: $getSinglePostId) {
      id
      title
      description
      createdBy {
        firstName
      }
    }
  }
`;

export default function Post() {
  const { id } = useParams();

  const [createPost] = useMutation(CREATE_POST);
  const [UpdatePost] = useMutation(UPDATE_POST);
  const { data: postData } = useQuery(QUERY_SINGLE_POST, {
    variables: {
      getSinglePostId: id,
    },
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      console.log(postData?.getSinglePost);
      const getPost = postData?.getSinglePost;
      setValue("title", getPost?.title);
      setValue("description", getPost?.description);
    }
  }, [postData]);

  const handleReset = () => {
    reset();
  };

  const formSubmit = (data) => {
    try {
      if (id) {
        console.log(data);
        UpdatePost({
          variables: {
            input: { ...data },
            updatePostId: id,
          },
        })
          .then((res) => {
            console.log(res.data);
            navigate("/user");
            toast.success("post update successfully");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      } else {
        createPost({
          variables: {
            input: { ...data },
          },
        })
          .then((res) => {
            console.log(res.data);
            navigate("/user");
            toast.success("post added successfully");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }
    } catch (err) {
      console.log("create post errors", err.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {id ? "Update Post" : "Create New Post"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
          >
            {/* title  */}
            <InputField
              id="title"
              name="title"
              type="text"
              label="Title"
              placeholder="Title..."
              register={{
                ...register("title", { required: "title is required" }),
              }}
              errorMessage={errors?.title?.message}
            />

            {/* description  */}
            <InputField
              id="description"
              name="description"
              type="text"
              label="Description"
              placeholder="Description..."
              register={{
                ...register("description", {
                  required: "description is required",
                }),
              }}
              errorMessage={errors?.description?.message}
            />
            <button
              type="reset"
              className="bg-indigo-600 text-white hover:bg-indigo-500 me-3 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-500 me-3 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              {id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
