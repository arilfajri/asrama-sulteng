import { createSlice } from "@reduxjs/toolkit";
import {
  createKeuangan,
  deleteKeuangan,
  updateKeuangan,
} from "./keuanganThunk";

const keuanganInitState = {
  data: [],
};

const keuanganSlice = createSlice({
  name: "keuangan",
  initialState: keuanganInitState,
  reducers: {
    resetDataKeuangan: (state) => keuanganInitState,
  },
  extraReducers: (builder) => {
    builder
      // createKeuangan
      .addCase(createKeuangan.pending, (state, action) => {
        return {
          ...state,
          createKeuanganLoading: true,
          createKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(createKeuangan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          createKeuanganLoading: false,
          createKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(createKeuangan.rejected, (state, action) => {
        return {
          ...state,
          createKeuanganLoading: false,
          createKeuanganError: action.payload,
          type: action.type,
        };
      })
      // updateKeuangan
      .addCase(updateKeuangan.pending, (state, action) => {
        return {
          ...state,
          updateKeuanganLoading: true,
          updateKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(updateKeuangan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateKeuanganLoading: false,
          updateKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(updateKeuangan.rejected, (state, action) => {
        return {
          ...state,
          updateKeuanganLoading: false,
          updateKeuanganError: action.payload,
          type: action.type,
        };
      })

      // deleteKeuangan
      .addCase(deleteKeuangan.pending, (state, action) => {
        return {
          ...state,
          deleteKeuanganLoading: true,
          deleteKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(deleteKeuangan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          deleteKeuanganLoading: false,
          deleteKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(deleteKeuangan.rejected, (state, action) => {
        return {
          ...state,
          deleteKeuanganLoading: false,
          deleteKeuanganError: action.payload,
          type: action.type,
        };
      });
  },
});
export const { resetDataKeuangan } = keuanganSlice.actions;

export const { actions: keuanganAction, reducer: keuanganReducer } =
  keuanganSlice;
