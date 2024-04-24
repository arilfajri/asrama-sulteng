import { createSlice } from "@reduxjs/toolkit";
import { get_mahasiswa } from "./getDataMahasiswaThunk";

const getDataMahasiswaInitState = {
  mahasiswas: [],
};

const getDataMahasiswaSlice = createSlice({
  name: "getDataMahasiswa",
  initialState: getDataMahasiswaInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_mahasiswa.pending, (state, action) => {
        return {
          ...state,
          get_mahasiswaLoading: true,
          get_mahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(get_mahasiswa.fulfilled, (state, action) => {
        return {
          ...state,
          mahasiswas: action.payload,
          get_mahasiswaLoading: false,
          get_mahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(get_mahasiswa.rejected, (state, action) => {
        return {
          ...state,
          get_mahasiswaLoading: false,
          get_mahasiswaError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: get_mahasiswaAction, reducer: get_mahasiswaReducer } =
  getDataMahasiswaSlice;
