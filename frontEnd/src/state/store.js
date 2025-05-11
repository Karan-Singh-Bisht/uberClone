import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Auth/userAuthSlice";
import captainAuthReducer from "./Auth/captainAuthSlice";
import mapReducer from "./map/mapSlice";

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    captainAuth: captainAuthReducer,
    map: mapReducer,
  },
});
