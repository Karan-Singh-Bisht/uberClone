import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Auth/userAuthSlice";
import captainAuthReducer from "./Auth/captainAuthSlice";
import mapReducer from "./map/mapSlice";
import rideReducer from "./ride/rideSlice";
import paymentReducer from "./Payment/paymentSlice";

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    captainAuth: captainAuthReducer,
    map: mapReducer,
    ride: rideReducer,
    payment: paymentReducer,
  },
});
