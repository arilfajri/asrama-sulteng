import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, logout, register } from "./authThunk";

const authInitState = {
  data: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitState,
  reducers: {
    reset: (state) => authInitState,
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state, action) => {
        return {
          ...state,
          registerLoading: true,
          registerError: undefined,
          type: action.type,
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          registerLoading: false,
          registerError: undefined,
          type: action.type,
        };
      })
      .addCase(register.rejected, (state, action) => {
        return {
          ...state,
          registerLoading: false,
          registerError: action.payload,
          type: action.type,
        };
      })

      // login
      .addCase(login.pending, (state, action) => {
        return {
          ...state,
          loginLoading: true,
          loginError: undefined,
          type: action.type,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loginLoading: false,
          loginError: undefined,
          type: action.type,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          loginLoading: false,
          loginError: action.payload,
          type: action.type,
        };
      })

      // get me
      .addCase(getMe.pending, (state, action) => {
        return {
          ...state,
          getMeLoading: true,
          getMeError: undefined,
          type: action.type,
        };
      })
      .addCase(getMe.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getMeLoading: false,
          getMeError: undefined,
          type: action.type,
        };
      })
      .addCase(getMe.rejected, (state, action) => {
        return {
          ...state,
          getMeLoading: false,
          getMeError: action.payload,
          type: action.type,
        };
      })

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

export const { reset } = authSlice.actions;

export const { actions: authAction, reducer: authReducer } = authSlice;
