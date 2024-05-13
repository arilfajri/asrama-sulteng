import { createSlice } from "@reduxjs/toolkit";
import { createKeuangan, getAllKeuangan } from "./keuanganThunk";

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
      })
      // createMahasiswa
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
      });
  },
});
export const { resetDataKeuangan } = keuanganSlice.actions;

export const { actions: keuanganAction, reducer: keuanganReducer } =
  keuanganSlice;
