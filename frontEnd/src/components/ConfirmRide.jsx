import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosCash } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";

const ConfirmRide = ({ setConfirmRide, setFindingDriver, setVehiclePanel }) => {
  return (
    <div className="">
      <div className="text-2xl translate-x-1/2 text-gray-400">
        <MdKeyboardArrowDown onClick={() => setConfirmRide(false)} />
      </div>
      <h1 className="text-2xl font-semibold mb-1">Confirm Your Ride</h1>
      <div className="flex justify-between flex-col items-center">
        <img src="/uberCar.webp" alt="uber car" className="h-20 p-1" />
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-3">
            <MdOutlineMyLocation className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-md text-gray-600">Kankariya,Ahemdabad</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-xl" />
            <div className="p-2">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-md text-gray-600">Kankariya,Ahemdabad</p>
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
        <button
          onClick={() => {
            setFindingDriver(true),
              setConfirmRide(false),
              setVehiclePanel(false);
          }}
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
