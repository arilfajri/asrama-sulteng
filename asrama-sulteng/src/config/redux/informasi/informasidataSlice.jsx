import { createSlice } from "@reduxjs/toolkit";
import { getInformasi } from "./informasiThunk";

const informasiDataInitState = {
  data: [],
};

const informasiDataSlice = createSlice({
  name: "informasiData",
  initialState: informasiDataInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getInformasi
      .addCase(getInformasi.pending, (state, action) => {
        return {
          ...state,
          getInformasiLoading: true,
          getInformasiError: undefined,
          type: action.type,
        };
      })
      .addCase(getInformasi.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getInformasiLoading: false,
          getInformasiError: undefined,
          type: action.type,
        };
      })
      .addCase(getInformasi.rejected, (state, action) => {
        return {
          ...state,
          getInformasiLoading: false,
          getInformasiError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: informasiDataAction, reducer: informasiDataReducer } =
  informasiDataSlice;
