import React from "react";
import { IoIosCash } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdKeyboardArrowDown,
  MdOutlineMyLocation,
  MdOutlineStarPurple500,
} from "react-icons/md";

const DriverDetails = ({ ride, setDriverDetail }) => {
  return (
    <div>
      <div className="text-2xl translate-x-1/2 text-gray-400">
        <MdKeyboardArrowDown onClick={() => setDriverDetail(false)} />
      </div>
      <div className="flex gap-2 justify-around w-full">
        <img src="/uberCar.webp" alt="uber car" className="h-20 p-1" />
        <div>
          <h3 className="text-2xl font-semibold">
            {ride?.captain?.fullName?.firstName}
          </h3>
          <h1 className="text-xl font-bold">{ride?.captain?.vehicle?.plate}</h1>
          <p className="text-lg">{ride?.captain?.vehicle?.vehicleType}</p>
        </div>
      </div>
      <div className="flex justify-between flex-col items-center">
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-3">
            <div>
              <MdOutlineMyLocation className="text-xl" />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-medium">{ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <IoLocationOutline className="text-xl" />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-medium">{ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoIosCash className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-md text-gray-600">Cash</p>
            </div>
          </div>
          <div className="mb-2 flex gap-2">
            <h1 className="text-lg font-semibold">OTP</h1>
            <h1 className="text-lg font-semibold">{ride?.otp}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
