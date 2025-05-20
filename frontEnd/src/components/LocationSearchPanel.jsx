import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { getFairPrice } from "../state/map/mapSlice";

const LocationSearchPanel = ({
  setIsOpen,
  setVehiclePanel,
  setPickup,
  setDestination,
  selecting,
  locations,
  pickup,
  destination,
}) => {
  const { loading, error } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <Loader />
      ) : (
        locations.map((location, index) => (
          <div
            onClick={() => {
              if (selecting === "pickup") {
                setPickup(location.description);
              } else {
                setDestination(location.description);
              }
            }}
            key={index}
            className="flex border-2 border-gray-100 p-2 active:border-black rounded-xl items-center px-4 gap-4 justify-start"
          >
            <h2 className="bg-[#eee] rounded-full">
              <FaLocationDot className="text-xl" />
            </h2>
            <h4 className="font-medium">{location.description}</h4>
          </div>
        ))
      )}
      {locations.length >= 1 && pickup && destination && (
        <div
          onClick={() => {
            setIsOpen(false);
            setVehiclePanel(true);
            dispatch(getFairPrice({ pickup, destination }));
          }}
          className="p-4 bg-black text-white flex items-center justify-center"
        >
          Confirm Ride
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
