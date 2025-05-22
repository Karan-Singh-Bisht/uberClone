import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getCaptainProfile, logout } from "../state/Auth/captainAuthSlice";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { confirmRide } from "../state/ride/rideSlice";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
  const navigate = useNavigate();
  const token = Cookies.get("captainToken");
  const dispatch = useDispatch();

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState({});
  const captainId = useSelector((state) => state?.captainAuth?.captain?._id);
  const { socket } = useContext(SocketContext);

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
    const getProfile = async () => {
      const result = await dispatch(getCaptainProfile()); // Capture the result
      if (result.meta?.requestStatus === "fulfilled") {
        navigate("/captain-home");
      } else {
        navigate("/captain-login");
        Cookies.remove("captainToken");
      }
    };

    if (!captainId) {
      getProfile();
    }
  }, [token, dispatch, navigate, captainId]);

  useEffect(() => {
    if (!captainId) return;
    socket.emit("join", { userId: captainId, userType: "captain" });
  }, [captainId]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  const confirmDriveRide = async () => {
    try {
      await dispatch(confirmRide(ride._id));
    } catch (err) {
      console.log(err);
    }
  };

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <MdKeyboardArrowDown onClick={handleLogOut} />
        </Link>
      </div>
      <div className="h-3/5 flex gap-4">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmDriveRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
