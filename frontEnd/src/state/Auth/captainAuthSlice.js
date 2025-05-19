import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Cookies from "js-cookie";

export const registerCaptain = createAsyncThunk(
  "/auth/registerCaptain",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/captain/register`,
        credentials
      );
      Cookies.set("captainToken", response.data.token, { expires: 1 });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginCaptain = createAsyncThunk(
  "/auth/loginCaptain",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/captain/login`,
        credentials
      );
      Cookies.set("captainToken", response.data.token, { expires: 1 });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logoutCaptain",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookies.get("captainToken");
      await axios.get(`${API_BASE_URL}/api/v1/captain/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutCaptain());
      return { message: "Captain logged out successfully" };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCaptainProfile = createAsyncThunk(
  "/auth/getCaptainProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.captainAuth.token || Cookies.get("captainToken");
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/captain/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const captainAuthSlice = createSlice({
  name: "captainAuth",
  initialState: {
    loading: false,
    error: null,
    captain: null,
    token: null,
  },
  reducers: {
    logoutCaptain: (state) => {
      state.captain = null;
      state.error = null;
      Cookies.remove("captainToken");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCaptain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCaptain.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerCaptain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginCaptain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCaptain.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.captain = action.payload.captainData;
        state.error = null;
      })
      .addCase(loginCaptain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCaptainProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCaptainProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.captain = action.payload.captain;
        state.token = Cookies.get("captainToken");
        state.error = null;
      })
      .addCase(getCaptainProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutCaptain } = captainAuthSlice.actions;
export default captainAuthSlice.reducer;
