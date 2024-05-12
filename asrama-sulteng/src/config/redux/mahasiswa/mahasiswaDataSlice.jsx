import { createSlice } from "@reduxjs/toolkit";
import { getAllMahasiswa } from "./mahasiswaThunk";

const mahasiswadataInitState = {
  data: [],
};

const mahasiswadataSlice = createSlice({
  name: "mahasiswadata",
  initialState: mahasiswadataInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllMahasiswa
      .addCase(getAllMahasiswa.pending, (state, action) => {
        return {
          ...state,
          getAllMahasiswaLoading: true,
          getAllMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllMahasiswa.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getAllMahasiswaLoading: false,
          getAllMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllMahasiswa.rejected, (state, action) => {
        return {
          ...state,
          getAllMahasiswaLoading: false,
          getAllMahasiswaError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: mahasiswadataAction, reducer: mahasiswadataReducer } =
  mahasiswadataSlice;
