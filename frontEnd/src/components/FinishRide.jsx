import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endRide } from "../state/ride/rideSlice";

const FinishRide = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enddRide = async () => {
    try {
      const response = await dispatch(endRide(props.ride._id));
      if (response?.payload?.ride) {
        props.setFinishRidePanel(false);
        navigate("/captain-home");
      } else {
        console.log("Error ending ride");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="p-1 flex w-full items-center absolute top-5 justify-center"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <MdKeyboardArrowDown className="text-2xl" />
      </div>
      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user?.fullName?.firstName}{" "}
            {props.ride?.user?.fullName?.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            {/* <i className="ri-map-pin-user-fill"></i> */}
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            {/* <i className="ri-currency-line"></i> */}
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={enddRide}
            className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
