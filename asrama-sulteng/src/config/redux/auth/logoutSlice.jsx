import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authThunk";

const logoutInitState = {
  data: [],
};

const logoutSlice = createSlice({
  name: "logout",
  initialState: logoutInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // logout
      .addCase(logout.pending, (state, action) => {
        return {
          ...state,
          logoutLoading: true,
          logoutError: undefined,
          type: action.type,
        };
      })
      .addCase(logout.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          logoutLoading: false,
          logoutError: undefined,
          type: action.type,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        return {
          ...state,
          logoutLoading: false,
          logoutError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: logoutAction, reducer: logoutReducer } = logoutSlice;
