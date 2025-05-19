import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateUserRoute = ({ children }) => {
  const token = Cookies.get("userToken");

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateUserRoute;
