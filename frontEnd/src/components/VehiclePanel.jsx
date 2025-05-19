import React from "react";
import { FaUser } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";

const VehiclePanel = ({ setVehicle, setVehiclePanel, setConfirmRide }) => {
  const fare = useSelector((state) => state.map.fairPrice.fare);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl flex justify-between font-bold">
        <h1>Choose a vehicle</h1>
        <MdKeyboardArrowDown onClick={() => setVehiclePanel(false)} />
      </div>
      <div
        onClick={() => {
          setConfirmRide(true);
          setVehicle("car");
        }}
        className="flex w-full items-center border-2 active:border-black rounded-xl justify-between p-2"
      >
        <img src="/uberCar.webp" alt="uber car" className="h-12" />
        <div className="flex flex-col w-1/2 px-1 py-1">
          <div className="flex gap-1">
            <h4 className="font-medium text-base">UberGo</h4>
            <span className="flex gap-1">
              <FaUser />
              <h4 className="text-sm">4</h4>
            </span>
          </div>
          <div>
            <h5 className="text-sm">2 mins away . 15:24</h5>
            <p className="text-gray-700 text-xs">Affordable, compact rides</p>
          </div>
        </div>
        <h1 className="font-medium text-xl">₹{fare?.car.toFixed(2)}</h1>
      </div>
      <div
        onClick={() => {
          setConfirmRide(true);
          setVehicle("motorcycle");
        }}
        className="flex w-full items-center border-2 active:border-black rounded-xl justify-between p-2"
      >
        <img src="/uberBike.webp" alt="uber car" className="h-12" />
        <div className="flex flex-col w-1/2 px-1 py-1">
          <div className="flex gap-1">
            <h4 className="font-medium text-base">Moto</h4>
            <span className="flex gap-1">
              <FaUser />
              <h4 className="text-sm">1</h4>
            </span>
          </div>
          <div>
            <h5 className="text-sm">3 mins away . 15:24</h5>
            <p className="text-gray-700 text-xs">
              Affordable, motorcycle rides
            </p>
          </div>
        </div>
        <h1 className="font-medium text-xl">₹{fare?.motorcycle.toFixed(2)}</h1>
      </div>
      <div
        onClick={() => {
          setConfirmRide(true);
          setVehicle("auto");
        }}
        className="flex w-full items-center border-2 active:border-black rounded-xl justify-between p-2"
      >
        <img src="/autoRickshaw.webp" alt="uber car" className="h-12" />
        <div className="flex flex-col w-1/2 px-1 py-1">
          <div className="flex gap-1">
            <h4 className="font-medium text-base">Auto</h4>
            <span className="flex gap-1">
              <FaUser />
              <h4 className="text-sm">3</h4>
            </span>
          </div>
          <div>
            <h5 className="text-sm">3 mins away . 15:24</h5>
            <p className="text-gray-700 text-xs">Affordable, auto rides</p>
          </div>
        </div>
        <h1 className="font-medium text-xl">₹{fare?.auto.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default VehiclePanel;
