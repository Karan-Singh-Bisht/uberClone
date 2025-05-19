import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosCash } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { createRide } from "../state/ride/rideSlice";

const ConfirmRide = ({
  pickup,
  destination,
  setConfirmRide,
  setFindingDriver,
  setVehiclePanel,
  vehicle,
}) => {
  const fare = useSelector((state) => state.map.fairPrice.fare);
  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="text-2xl translate-x-1/2 text-gray-400">
        <MdKeyboardArrowDown onClick={() => setConfirmRide(false)} />
      </div>
      <h1 className="text-2xl font-semibold mb-1">Confirm Your Ride</h1>
      <div className="flex justify-between flex-col items-center">
        <img
          src={
            vehicle === "car"
              ? "/uberCar.webp"
              : vehicle === "auto"
              ? "/autoRickshaw.webp"
              : "uberBike.webp"
          }
          alt={vehicle}
          className="h-20 p-1"
        />
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-3 w-full">
            <div>
              <MdOutlineMyLocation className="text-xl" />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-medium break-words whitespace-normal max-w-full">
                {pickup}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <div>
              <IoLocationOutline className="text-xl" />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-medium break-words whitespace-normal max-w-full">
                {destination}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <IoIosCash className="text-xl" />
            </div>
            <div className="p-2 flex gap-2 items-center">
              <h3 className="text-lg font-medium">
                {vehicle === "car"
                  ? fare?.car.toFixed(2)
                  : vehicle === "auto"
                  ? fare?.auto.toFixed(2)
                  : fare?.motorcycle.toFixed(2)}
              </h3>
              <p className="text-md text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setFindingDriver(true),
              setConfirmRide(false),
              setVehiclePanel(false);
            dispatch(createRide({ pickup, destination, vehicleType: vehicle }));
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
