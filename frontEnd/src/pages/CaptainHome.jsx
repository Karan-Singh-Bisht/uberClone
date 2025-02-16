import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getCaptainProfile, logout } from "../state/Auth/captainAuthSlice";

const CaptainHome = () => {
  const navigate = useNavigate();
  //   const { token } = useSelector((state) => state.captainAuth);
  const token = Cookies.get("captainToken");
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const response = await dispatch(logout());
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/captain-login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const getProfile = async () => {
      const result = await dispatch(getCaptainProfile()); // Capture the result
      if (result.meta?.requestStatus === "fulfilled") {
        navigate("/captain-home");
      } else {
        navigate("/captain-login");
        Cookies.remove("captainToken");
      }
    };

    getProfile();
  }, [token, dispatch, navigate]);

  return (
    <div>
      <button onClick={handleLogOut} className="bg-gray-500 p-10">
        Log Out
      </button>
    </div>
  );
};

export default CaptainHome;
