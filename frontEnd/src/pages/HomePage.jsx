import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logOut } from "../state/Auth/userAuthSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardArrowDown } from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import DriverDetails from "../components/DriverDetails";
import { RxCross2 } from "react-icons/rx";
import { getAutoCompleteSuggestion } from "../state/map/mapSlice";
import { debounce } from "lodash";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from "../context/SocketContext";

const HomePage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [selecting, setSelecting] = useState("");
  const [destination, setDestination] = useState("");
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [findingDriver, setFindingDriver] = useState(false);
  const [driverDetail, setDriverDetail] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [ride, setRide] = useState({});
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const findingDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.map.autoCompleteSuggestions);
  const userId = useSelector((state) => state.userAuth?.user?._id);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserProfile());
    };

    if (!userId) {
      fetchUser();
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) return;
    socket.emit("join", { userId, userType: "user" });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("rideResponse");
      socket.off("error");
    };
  }, [userId]);

  socket.on("ride-confirmed", (ride) => {
    setFindingDriver(false);
    setDriverDetail(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    // navigate("/riding", {
    //   state: {
    //     ride: ride,
    //   },
    // });
    setFindingDriver(false);
    setDriverDetail(false);
  });

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
          transform: "translateY(150%)",
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

  useGSAP(
    function () {
      if (driverDetail) {
        gsap.to(driverDetailsRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(driverDetailsRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [driverDetail]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [query, setQuery] = useState("");

  useEffect(() => {
    const debouncedFetch = debounce((q) => {
      dispatch(getAutoCompleteSuggestion(q));
    }, 500); // 500ms delay

    if (query.trim().length > 1) {
      debouncedFetch(query);
    }

    return () => {
      debouncedFetch.cancel(); // cleanup on unmount or query change
    };
  }, [query, dispatch]);

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
        <LiveTracking />
      </div>
      <div className="flex flex-col overflow-hidden justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h4 className="font-semibold mt-2 text-3xl">
            {isOpen ? (
              <span
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-5"
              >
                <MdKeyboardArrowDown />
              </span>
            ) : (
              ""
            )}
            Find a trip
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="line bottom-[12vh] h-16 z-10 absolute w-1 left-10 rounded-full bg-black"></div>
            <div className="relative w-full mt-5">
              <input
                value={pickup}
                onClick={() => {
                  setIsOpen(true);
                  setSelecting("pickup");
                }}
                onChange={(e) => {
                  setPickup(e.target.value), setQuery(e.target.value);
                }}
                className="bg-[#eee] w-full px-12 py-2 text-base rounded-lg pr-10"
                type="text"
                placeholder="Add a pickup location"
                name="pickup"
              />
              {pickup && (
                <button
                  type="button"
                  onClick={() => setPickup("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  <RxCross2 className="text-lg" />
                </button>
              )}
            </div>
            <div className="relative w-full">
              <input
                value={destination}
                onClick={() => {
                  setIsOpen(true);
                  setSelecting("destination");
                }}
                onChange={(e) => {
                  setDestination(e.target.value), setQuery(e.target.value);
                }}
                name="destination"
                className="bg-[#eee] w-full px-12 mt-3 py-2 text-base rounded-lg pr-10" // Note the padding-right
                type="text"
                placeholder="Enter your destination"
              />
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  <RxCross2 className="text-lg" />
                </button>
              )}
            </div>
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            selecting={selecting}
            setDestination={setDestination}
            setIsOpen={setIsOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            locations={locations}
            pickup={pickup}
            destination={destination}
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
          setVehicle={setVehicle}
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed translate-y-full flex flex-col gap-2 z-10 bottom-0 w-full bg-white p-4"
      >
        <ConfirmRide
          vehicle={vehicle}
          pickup={pickup}
          destination={destination}
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
        <DriverDetails
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}
          setFindingDriver={setFindingDriver}
          ride={ride}
          setDriverDetail={setDriverDetail}
        />
      </div>
    </div>
  );
};

export default HomePage;
