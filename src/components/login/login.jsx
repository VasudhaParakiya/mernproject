import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const LOGIN = gql`
  mutation LoginUser($input: loginUserInput!) {
    loginUser(input: $input) {
      id
      firstName
      lastName
      email
      gender
      hobby
      dateOfBirth
      role
      active
      isVerified
      accessToken
    }
  }
`;
const Login = () => {
  const [LoginUser] = useMutation(LOGIN);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    // console.log(data);
    LoginUser({
      variables: {
        input: { ...data },
      },
    })
      .then((res) => {
        // console.log("🚀loginUser ~ .then ~ res:", res);
        // console.log(res.data.loginUser);

        const loginData = res?.data?.loginUser;

        if (loginData.active && loginData.isVerified) {
          const token = res?.data?.loginUser?.accessToken;
          const role = res?.data?.loginUser?.role;

          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", JSON.stringify(role));
            toast.success("login successfully");
            if (loginData.role === "admin") return navigate("/admin");
            // if (loginData.role === "user") return navigate("/user");
            if (loginData.role === "user") return navigate("/user");
          } else {
            console.log("please verify in your email");
            toast.error(err.message);
          }
        }

        // console.log("🚀 ~ .then ~ loginData:", loginData.active, typeof loginData.active)
        if (!loginData.active) {
          toast.error("user not active");
        } else {
          toast.error("user not verify");
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-left"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              <span className="block w-full text-red-500 tetx-center">
                {errors?.email?.message}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotPassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </div>
              <span className="block w-full text-red-500 tetx-center">
                {errors?.password?.message}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <Link
              to={"/signup"}
              className="mt-2 inline-block underline decoration-1 text-indigo-600"
            >
              create your account
            </Link>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Login;
