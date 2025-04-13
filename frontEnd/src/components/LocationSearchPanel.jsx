import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ setIsOpen, setVehiclePanel }) => {
  const locations = [
    "24B, Near Bisht cafe, Sheryians Coding School, Bhopal",
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "24B, Near Malhotra cafe, Sheryians Coding School, Bhopal",
    "24B, Near Sharma cafe, Sheryians Coding School, Bhopal",
  ];

  return (
    <div className="flex flex-col gap-4">
      {locations.map((location, index) => (
        <div
          onClick={() => {
            setIsOpen(false);
            setVehiclePanel(true);
          }}
          key={index}
          className="flex border-2 border-gray-100 p-2 active:border-black rounded-xl items-center px-4 gap-4 justify-start"
        >
          <h2 className="bg-[#eee] rounded-full">
            <FaLocationDot className="text-xl" />
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
