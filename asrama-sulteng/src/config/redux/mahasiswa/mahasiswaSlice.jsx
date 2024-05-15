import { createSlice } from "@reduxjs/toolkit";
import {
  createMahasiswa,
  getAllMahasiswa,
  updateMahasiswa,
} from "./mahasiswaThunk";

const mahasiswaInitState = {
  data: [],
};

const mahasiswaSlice = createSlice({
  name: "mahasiswa",
  initialState: mahasiswaInitState,
  reducers: {
    resetDataMahasiswa: (state) => mahasiswaInitState,
  },
  extraReducers: (builder) => {
    builder
      // createMahasiswa
      .addCase(createMahasiswa.pending, (state, action) => {
        return {
          ...state,
          createMahasiswaLoading: true,
          createMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(createMahasiswa.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          createMahasiswaLoading: false,
          createMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(createMahasiswa.rejected, (state, action) => {
        return {
          ...state,
          createMahasiswaLoading: false,
          createMahasiswaError: action.payload,
          type: action.type,
        };
      })

      // updateMahasiswa
      .addCase(updateMahasiswa.pending, (state, action) => {
        return {
          ...state,
          updateMahasiswaLoading: true,
          updateMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(updateMahasiswa.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateMahasiswaLoading: false,
          updateMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(updateMahasiswa.rejected, (state, action) => {
        return {
          ...state,
          updateMahasiswaLoading: false,
          updateMahasiswaError: action.payload,
          type: action.type,
        };
      });
  },
});
export const { resetDataMahasiswa } = mahasiswaSlice.actions;

export const { actions: mahasiswaAction, reducer: mahasiswaReducer } =
  mahasiswaSlice;
