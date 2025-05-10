import React, { useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import FinishRide from "./FinishRide";
import gsap from "gsap";

const CaptainRiding = () => {
  const handleLogOut = () => {
    console.log("LOG_OUT");
  };
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
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
      <div className="h-4/5 flex gap-4">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 relative p-6 bg-yellow-400 flex flex-col items-center justify-center">
        <div
          onClick={() => setFinishRidePanel(true)}
          className="absolute flex items-center justify-center top-4 rounded-xl w-12 h-5"
        >
          <MdKeyboardArrowUp className="text-3xl" onClick={handleLogOut} />
        </div>
        <div className="w-full flex justify-between items-center">
          <h4 className="text-xl font-semibold">4 KM AWAY</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
