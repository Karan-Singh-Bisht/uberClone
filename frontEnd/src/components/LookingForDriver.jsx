import React from "react";
import { IoIosCash } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";

const LookingForDriver = ({ setFindingDriver }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Looking for Nearby Driver</h1>
      <div className="flex justify-between flex-col items-center relative">
        {/* Ripple Effect Container */}
        <div className="absolute top-28 flex items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full bg-blue-400 opacity-30 animate-ripple"></div>
          <div
            className="w-16 h-16 rounded-full bg-blue-400 opacity-30 animate-ripple absolute"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>

        {/* Car Image */}
        <img
          src="/uberCar.webp"
          alt="uber car"
          className="h-48 p-1 relative z-0"
        />

        {/* Info Section */}
        <div className="w-full flex flex-col mt-2 relative z-10">
          <div className="flex items-center gap-3">
            <MdOutlineMyLocation className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-md text-gray-600">Kankariya, Ahemdabad</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-md text-gray-600">Kankariya, Ahemdabad</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoIosCash className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">$132.90</h3>
              <p className="text-md text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
