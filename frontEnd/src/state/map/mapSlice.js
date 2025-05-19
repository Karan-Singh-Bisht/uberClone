import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Cookies from "js-cookie";

export const getFairPrice = createAsyncThunk(
  "/map/getFairPrice",
  async ({ pickup, destination }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ride/getFare?pickup=${encodeURIComponent(
          pickup
        )}&destination=${encodeURIComponent(destination)}`,
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

// Async thunk to fetch auto-complete suggestions
export const getAutoCompleteSuggestion = createAsyncThunk(
  "/map/getAutoCompleteSuggestion",
  async (input, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/maps/getAutoSuggestion?input=${encodeURIComponent(
          input
        )}`,
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

// Slice for map-related state
const mapSlice = createSlice({
  name: "map",
  initialState: {
    autoCompleteSuggestions: [],
    fairPrice: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAutoCompleteSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAutoCompleteSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.autoCompleteSuggestions = action.payload;
        state.error = null;
      })
      .addCase(getAutoCompleteSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFairPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFairPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.fairPrice = action.payload;
        state.error = null;
      })
      .addCase(getFairPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mapSlice.reducer;
