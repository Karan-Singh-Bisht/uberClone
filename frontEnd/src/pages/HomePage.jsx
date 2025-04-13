import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/Auth/userAuthSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import DriverDetails from "../components/DriverDetails";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [findingDriver, setFindingDriver] = useState(false);
  const [driverDetail, setDriverDetail] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const findingDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);

  const handleLogout = async () => {
    const response = await dispatch(logOut());
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  useGSAP(
    function () {
      if (isOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 5,
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
      }
    },
    [isOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRide]
  );

  useGSAP(
    function () {
      if (findingDriver) {
        gsap.to(findingDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(findingDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [findingDriver]
  );

  useGSAP(function () {
    if (driverDetail) {
      gsap.to(driverDetailsRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(driverDetailsRef.current, {
        transform: "translateY(100%)",
      });
    }
  });

  const { token } = useSelector((state) => state.userAuth);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
        alt="uber logo"
        className="w-16 absolute left-5 top-5"
      />
      <div
        onClick={() => setVehiclePanel(false)}
        className="h-screen w-screen overflow-hidden"
      >
        <img src="/map.webp" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col overflow-hidden justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h4 className="font-semibold mt-2 text-3xl">
            {isOpen ? (
              <span
                onClick={() => setIsOpen(false)}
                className="absolute top-3 left-0"
              >
                <MdKeyboardArrowDown />
              </span>
            ) : (
              ""
            )}
            Find a trip
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="line bottom-[12vh] h-16 absolute w-1 left-10 rounded-full bg-black"></div>
            <input
              value={pickup}
              onClick={() => setIsOpen(true)}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] w-full mt-5 px-12 py-2 text-base rounded-lg"
              type="text"
              placeholder="Add a pickup location"
              name="pickup"
            />
            <input
              value={destination}
              onClick={() => setIsOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              name="destination"
              className="bg-[#eee] w-full px-12 mt-3 py-2 text-base rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setIsOpen={setIsOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      {/* <button
        className="bg-gray-400 rounded-md text-md w-[5vw] h-[2vw] flex justify-center items-center"
        onClick={handleLogout}
      >
        Logout
      </button> */}
      <div
        ref={vehiclePanelRef}
        className="fixed translate-y-full flex flex-col gap-2 z-10 bottom-0 w-full bg-white p-4"
      >
        <VehiclePanel
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed translate-y-full flex flex-col gap-2 z-10 bottom-0 w-full bg-white p-4"
      >
        <ConfirmRide
          setVehiclePanel={setVehiclePanel}
          setFindingDriver={setFindingDriver}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={findingDriverRef}
        className="fixed translate-y-full flex flex-col gap-2 z-10 bottom-0 w-full bg-white p-4"
      >
        <LookingForDriver setFindingDriver={setFindingDriver} />
      </div>
      <div
        ref={driverDetailsRef}
        className="fixed translate-y-full flex flex-col gap-2 z-10 bottom-0 w-full bg-white p-4"
      >
        <DriverDetails setDriverDetail={setDriverDetail} />
      </div>
    </div>
  );
};

export default HomePage;
