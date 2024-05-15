import { createSlice } from "@reduxjs/toolkit";
import { updateInformasi } from "./informasiThunk";

const informasiInitState = {
  data: [],
};

const informasiSlice = createSlice({
  name: "informasi",
  initialState: informasiInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Informasi
      .addCase(updateInformasi.pending, (state, action) => {
        return {
          ...state,
          updateInformasiLoading: true,
          updateInformasiError: undefined,
          type: action.type,
        };
      })
      .addCase(updateInformasi.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateInformasiLoading: false,
          updateInformasiError: undefined,
          type: action.type,
        };
      })
      .addCase(updateInformasi.rejected, (state, action) => {
        return {
          ...state,
          updateInformasiLoading: false,
          updateInformasiError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetDataInformasi } = informasiSlice.actions;

export const { actions: informasiAction, reducer: informasiReducer } =
  informasiSlice;
