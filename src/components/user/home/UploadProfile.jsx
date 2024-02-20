import React, { useEffect, useState } from "react";
import Button from "../../inputAllField/ButtonField";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const UPLOAD_PHOTO = gql`
  mutation UploadProfilePhoto($input: uploadProfileInput) {
    uploadProfilePhoto(input: $input) {
      profile
    }
  }
`;

const GET_PROFILE_PHOTO = gql`
  query GetProfilePhoto {
    getProfilePhoto {
      url
    }
  }
`;

export default function UploadProfile() {
  const [UploadProfilePhoto] = useMutation(UPLOAD_PHOTO);
  const [GetProfilePhoto, { data }] = useLazyQuery(GET_PROFILE_PHOTO);
  const [filePreview, setFilePreview] = useState("");
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    GetProfilePhoto()
      .then((res) => {
        console.log(res.data.getProfilePhoto.url);

        let tempUrl =
          "http://localhost:5000/uploads/" + res.data.getProfilePhoto.url;
        setFilePreview(tempUrl);
        setIsShow(true);
      })
      .catch((err) => console.log(err));

    // console.log("🚀 ~ UploadProfile ~ profileData:", data);
  }, [GetProfilePhoto]);

  

  // profile image conver to base 64
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          setFilePreview(result);
          setValue("file", result);
          //   console.log("base64 : ", result);
        })
        .catch((err) => {
          console.log("🚀 ~ handleFile ~ err:", err);
        });
    }
  };

  const formSubmit = (data) => {
    // console.log("🚀 ~ formSubmit ~ data:", data.file);
    const file = data.file;
    // console.log("🚀 ~ formSubmit ~ file:", file);

    try {
      UploadProfilePhoto({
        variables: {
          input: { url: file },
        },
      })
        .then((res) => {
          console.log(res);
          if (res) {
            toast.success("file upload successfully");
            setIsShow(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    } catch (error) {
      console.log("🚀 ~ formSubmit ~ error:", error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
          {!filePreview && (
            <>
              <input
                type="file"
                {...register("file", { required: "File is required" })}
                onChange={handleFile}
                className="mb-2"
              />
            </>
          )}

          {filePreview && (
            <div className="mb-3">
              <img
                src={filePreview}
                alt="File Preview"
                className="w-auto me-2"
              />
              <button
                className="bg-red-500 text-white px-2 py-1 "
                type="submit"
                onClick={() => {
                  setValue("file", null);
                  setFilePreview("");
                  setIsShow(false);
                }}
              >
                X
              </button>
            </div>
          )}
          {errors.file && <p className="text-red-500">{errors.file.message}</p>}
          {!isShow && (
            <Button
              className={
                "flex w-full mb-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }
              type={"submit"}
              btnName={"Upload File"}
            />
          )}
        </form>
      </div>
    </>
  );
}
