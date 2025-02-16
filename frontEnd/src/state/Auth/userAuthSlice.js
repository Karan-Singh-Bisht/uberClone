import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "userAuth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/register`,
        userData
      );
      Cookies.set("userToken", response.data.token, { expires: 1 });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "userAuth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/login`,
        userData
      );
      Cookies.set("userToken", response.data.token, { expires: 1 });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "userAuth/logOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      await axios.get(`${API_BASE_URL}/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutUser());
      return { message: "User logged out successfully" };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    error: null,
    loading: false,
    token: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      Cookies.remove("userToken");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.newUser;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
