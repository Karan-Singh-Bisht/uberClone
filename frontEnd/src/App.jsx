import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import CaptainLoginPage from "./pages/CaptainLoginPage";
import CaptainSignUpPage from "./pages/CaptainSignUpPage";
import HomePage from "./pages/HomePage";
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./components/CaptainRiding";
import PrivateUserRoute from "./pages/PrivateUserRoute";
import PrivateCaptainRoute from "./pages/PrivateCaptainRoute";
import Payment from "./pages/Payment";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/captain-login" element={<CaptainLoginPage />} />
        <Route path="/captain-signup" element={<CaptainSignUpPage />} />
        <Route
          path="/home"
          element={
            <PrivateUserRoute>
              <HomePage />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/riding"
          element={
            <PrivateUserRoute>
              <Riding />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateUserRoute>
              <Payment />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/captain-home"
          element={
            <PrivateCaptainRoute>
              <CaptainHome />
            </PrivateCaptainRoute>
          }
        />
        <Route path="/captain-riding" element={<CaptainRiding />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
