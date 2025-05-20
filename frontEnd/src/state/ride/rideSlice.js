import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Cookies from "js-cookie";

export const createRide = createAsyncThunk(
  "/ride/createRide",
  async ({ pickup, destination, vehicleType }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/ride/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const confirmRide = createAsyncThunk(
  "/ride/confirmRide",
  async (rideId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.captainAuth?.token;
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/ride/confirm`,
        { rideId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const startRide = createAsyncThunk(
  "/ride/startRide",
  async ({ rideId, otp }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.captainAuth?.token;
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ride/start-ride`,
        {
          params: { rideId, otp },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const endRide = createAsyncThunk(
  "/ride/endRide",
  async (rideId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.captainAuth?.token;
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/ride/end-ride`,
        { rideId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const rideSlice = createSlice({
  name: "ride",
  initialState: {
    ride: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createRide
      .addCase(createRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.loading = false;
        state.ride = action.payload;
        state.error = null;
      })
      .addCase(createRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // confirmRide
      .addCase(confirmRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmRide.fulfilled, (state, action) => {
        state.loading = false;
        state.ride = action.payload;
        state.error = null;
      })
      .addCase(confirmRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // startRide
      .addCase(startRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startRide.fulfilled, (state, action) => {
        state.loading = false;
        state.ride = action.payload;
        state.error = null;
      })
      .addCase(startRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // endRide
      .addCase(endRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endRide.fulfilled, (state, action) => {
        state.loading = false;
        state.ride = action.payload;
        state.error = null;
      })
      .addCase(endRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rideSlice.reducer;
