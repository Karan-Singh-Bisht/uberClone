import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateUserRoute = ({ children }) => {
  const token = Cookies.get("captainToken");

  return token ? children : <Navigate to="/captain-login" replace />;
};

export default PrivateUserRoute;
