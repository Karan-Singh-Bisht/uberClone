import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Uber Logo */}
      <img
        className="w-20 sm:w-24 mb-4"
        src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
        alt="Uber Logo"
      />

      {/* Sign Up Form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-2">Full Name</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              required
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={firstName}
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              required
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-xl font-semibold mt-4 mb-2">Email</h3>
          <input
            required
            className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-xl font-semibold mt-4 mb-2">Password</h3>
          <input
            required
            className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <button
            className="bg-black rounded-md text-white font-semibold px-4 py-2 border w-full mt-6 transition duration-300 hover:bg-gray-900"
            type="submit"
          >
            Register
          </button>

          <p className="text-center text-sm sm:text-base mt-4">
            Already have an account?{" "}
            <Link
              className="text-blue-500 font-semibold hover:underline"
              to={"/login"}
            >
              Sign In
            </Link>
          </p>
        </form>

        {/* Sign in as Captain */}
        <Link
          to={"/captain-login"}
          className="block w-full text-center bg-green-600 rounded-md text-white font-semibold px-4 py-2 border mt-6 transition duration-300 hover:bg-green-700"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignUpPage;
