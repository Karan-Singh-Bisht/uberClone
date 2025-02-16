import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/Auth/userAuthSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await dispatch(logOut());
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  const { token } = useSelector((state) => state.userAuth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div>
      <button
        className="bg-gray-400 rounded-md text-md w-[5vw] h-[2vw] flex justify-center items-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
