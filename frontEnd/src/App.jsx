import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import CaptainLoginPage from "./pages/CaptainLoginPage";
import CaptainSignUpPage from "./pages/CaptainSignUpPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/captain-login" element={<CaptainLoginPage />} />
        <Route path="/captain-signup" element={<CaptainSignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
