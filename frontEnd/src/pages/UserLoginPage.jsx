import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../state/Auth/userAuthSlice";
import { toast } from "sonner";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const UserLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const { loading, error } = useSelector((state) => state.userAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const response = await dispatch(loginUser(user));
    if (response?.meta?.requestStatus === "fulfilled") {
      navigate("/home");
      toast.success("Login Successfull", {
        style: {
          backgroundColor: "#D1FAE5",
        },
      });
    }

    if (response?.meta?.requestStatus === "rejected") {
      toast.error(response?.payload?.message || "Login failed", {
        style: {
          backgroundColor: "#FEE2E2",
        },
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Uber Logo */}
      <img
        className="w-24 sm:w-28 mb-5"
        src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
        alt="Uber Logo"
      />

      {/* Login Form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full sm:w-96">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl mb-2">What's your email?</h3>
          <input
            required
            className="bg-gray-100 mb-6 rounded px-4 py-3 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <div></div>
          <h3 className="text-xl mb-2">Enter Password</h3>
          <div className="relative">
            <input
              required
              className="bg-gray-100 mb-6 rounded px-4 py-3 w-full border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              type={seePassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button
              type="button"
              onClick={() => setSeePassword((prev) => !prev)}
              className="absolute right-4 top-1/3 transform -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
            >
              {seePassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>
          <button
            className="bg-black rounded-md text-white mb-4 font-semibold px-4 py-3 border w-full transition duration-300 hover:bg-gray-900"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : "Login"}
          </button>
          <p className="text-center text-sm sm:text-base">
            New here?{" "}
            <Link
              className="text-blue-500 font-semibold hover:underline"
              to={"/signup"}
            >
              Create New Account
            </Link>
          </p>
        </form>

        {/* Sign in as Captain */}
        <Link
          to={"/captain-signup"}
          className="block w-full text-center bg-green-600 rounded-md text-white font-semibold px-4 py-3 border mt-4 transition duration-300 hover:bg-green-700"
        >
          Sign up as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLoginPage;
