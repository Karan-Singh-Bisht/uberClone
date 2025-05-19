import React, { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import useSocket from "../hooks/useSocket";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;
  const socket = useSocket(ride.user._id, "user");

  const [paymentPanel, setPaymentPanel] = useState(false);
  const paymentPanelRef = useRef(null);

  useGSAP(() => {
    if (paymentPanel) {
      gsap.to(paymentPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(paymentPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [paymentPanel]);

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <MdKeyboardArrowDown />
        </Link>
      </div>

      <div className="h-4/5 flex gap-4">
        <LiveTracking />
      </div>

      <div className="h-1/5 relative p-6 bg-yellow-400 flex flex-col items-center justify-center">
        <div
          onClick={() => setPaymentPanel(true)}
          className="absolute flex items-center justify-center top-4 rounded-xl w-12 h-5"
        >
          <MdKeyboardArrowUp className="text-3xl" />
        </div>
        <div className="w-full flex justify-between items-center">
          <h4 className="text-xl font-semibold">Enjoy Your Ride</h4>
          <button
            onClick={() => setPaymentPanel(true)}
            className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
          >
            Pay Now
          </button>
        </div>
      </div>

      <div
        ref={paymentPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <div className="flex items-center justify-between mb-6">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullName.firstName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
