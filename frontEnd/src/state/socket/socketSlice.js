import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  rideRequest: null,
  rideResponse: null,
  rideStatus: null,
  driverLocation: null,
  error: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setRideRequest: (state, action) => {
      state.rideRequest = action.payload;
    },
    setRideResponse: (state, action) => {
      state.rideResponse = action.payload;
    },
    setRideStatus: (state, action) => {
      state.rideStatus = action.payload;
    },
    setDriverLocation: (state, action) => {
      state.driverLocation = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConnected,
  setRideRequest,
  setRideResponse,
  setRideStatus,
  setDriverLocation,
  setError,
} = socketSlice.actions;
export default socketSlice.reducer;
