import { createSlice } from "@reduxjs/toolkit";
import { getAllKeuangan } from "./keuanganThunk";

const keuangandataInitState = {
  data: [],
};

const keuangandataSlice = createSlice({
  name: "keuangandata",
  initialState: keuangandataInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllKeuangan
      .addCase(getAllKeuangan.pending, (state, action) => {
        return {
          ...state,
          getAllKeuanganLoading: true,
          getAllKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllKeuangan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getAllKeuanganLoading: false,
          getAllKeuanganError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllKeuangan.rejected, (state, action) => {
        return {
          ...state,
          getAllKeuanganLoading: false,
          getAllKeuanganError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: keuangandataAction, reducer: keuangandataReducer } =
  keuangandataSlice;
