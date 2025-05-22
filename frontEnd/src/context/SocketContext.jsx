import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const ride = useSelector((state) => state.ride?.ride?.ride);
  const captainId = ride?.captain?._id;
  const [captainLocation, setCaptainLocation] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("ride-started", (ride) => {
      navigate("/riding", {
        state: { ride },
      });
    });

    socket.on("captainLocationUpdate", (coordinates) => {
      setCaptainLocation({
        lat: coordinates[1],
        lng: coordinates[0],
      });
    });

    socket.on("payment-verified", (data) => {
      setPaymentStatus(data.ride);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ride-started");
      // socket.off("payment-verified");
      // socket.off("captainLocationUpdate");
    };
  }, []);

  useEffect(() => {
    if (!captainId) return;

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("updateCaptainLocation", {
            userId: captainId,
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          });
        });
      }
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);

    return () => {
      socket.off("error");
      // clearInterval(locationInterval); // ✅ You commented this out earlier
    };
  }, [captainId]);

  return (
    <SocketContext.Provider value={{ socket, captainLocation, paymentStatus }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
