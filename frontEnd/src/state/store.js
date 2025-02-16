import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Auth/userAuthSlice";
import captainAuthReducer from "./Auth/captainAuthSlice";

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    captainAuth: captainAuthReducer,
  },
});
