import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setConnected,
  setRideRequest,
  setRideResponse,
} from "../state/socket/socketSlice";
import socket from "../../socket";

const useSocket = (userId, userType = "user") => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Handle socket connection
    socket.on("connect", () => {
      dispatch(setConnected(true));
    });

    // Handle ride request (for captains)
    socket.on("rideRequest", (data) => {
      dispatch(setRideRequest(data));
    });

    // Handle ride response (for users)
    socket.on("rideResponse", (data) => {
      dispatch(setRideResponse(data));
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("rideRequest");
      socket.off("rideResponse");
    };
  }, [userId, userType, dispatch]);

  return socket;
};

export default useSocket;
