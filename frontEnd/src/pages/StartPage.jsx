import React from "react";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div
      className="h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1563256014-5d7586c22430?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      {/* Uber Logo */}
      <img
        className="w-16 sm:w-20 ml-4 sm:ml-8 mt-4"
        src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n	"
        alt="Uber Logo"
      />

      {/* Content Box */}
      <div className="bg-white p-5 sm:p-7 w-full max-w-md mx-auto shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ">
          Get started with Uber
        </h2>

        {/* Continue Button */}
        <Link
          to="/login"
          className="bg-black flex items-center justify-between text-white w-full font-semibold rounded-lg py-3 sm:py-4 px-5 transition-all duration-300 hover:opacity-80"
        >
          <span className="w-full text-center">Continue</span>
          <GrLinkNext className="text-lg sm:text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
