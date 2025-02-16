import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import CaptainLoginPage from "./pages/CaptainLoginPage";
import CaptainSignUpPage from "./pages/CaptainSignUpPage";
import HomePage from "./pages/HomePage";
import CaptainHome from "./pages/CaptainHome";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/captain-login" element={<CaptainLoginPage />} />
        <Route path="/captain-signup" element={<CaptainSignUpPage />} />
        <Route path="/captain-home" element={<CaptainHome />} />
      </Routes>
    </div>
  );
};

export default App;
