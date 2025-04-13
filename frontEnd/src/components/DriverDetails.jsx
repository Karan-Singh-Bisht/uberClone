import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";

const DriverDetails = ({ setDriverDetail }) => {
  const additionalFeatures = [
    { name: "Safety", icon: <SlArrowRight /> },
    { name: "Share my trip", icon: <SlArrowRight /> },
    { name: "Call driver", icon: <SlArrowRight /> },
  ];

  return (
    <div>
      <div className="flex justify-between flex-col relative">
        {/* Info Section */}
        <div className="flex gap-4 justify-between w-full px-4 py-2">
          <img className="w-24" src="/uberCar.webp" alt="image"></img>
          <div className="flex items-end flex-col">
            <h3 className="font-semibold text-sm">SANTH</h3>
            <h1 className="font-bold text-xl">KA15AK00-0</h1>
            <p className="opacity-50 font-base tracking-tighter">
              White Suzuki S-Presso LXI
            </p>
            <div className="flex">
              <MdOutlineStarPurple500 />
              <h5>4.9</h5>
            </div>
          </div>
        </div>
        {/* Additional Features */}
        <div className="flex flex-col px-2 mt-4">
          <div className="flex items-center p-2 bg-gray-200 rounded-lg w-1/2 text-gray-400 font-semibold">
            <input
              type="text"
              placeholder="Send a message..."
              className="bg-transparent outline-none flex-1 text-gray-700 font-semibold placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-evenly">
            {additionalFeatures.map((feature, indes) => (
              <div className="flex flex-col gap-2 mt-4 items-center">
                <div className="bg-gray-200 flex items-center justify-center rounded-full w-14 h-14">
                  {feature.icon}
                </div>
                <h2 className="font-semibold">{feature.name}</h2>
              </div>
            ))}
          </div>
        </div>
        <hr className="mt-2"></hr>
        <div className="w-full flex flex-col mt-2 relative z-10">
          <div className="flex items-center gap-3">
            <IoLocationOutline className="text-xl" />
            <div className="p-2">
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className="text-md text-gray-600">Kankariya, Ahemdabad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
