import { createSlice } from "@reduxjs/toolkit";
import { getAllMahasiswa, getMahasiswa } from "./mahasiswaThunk";

const mahasiswaallInitState = {
  data: [],
};

const mahasiswaallSlice = createSlice({
  name: "mahasiswaall",
  initialState: mahasiswaallInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllMahasiswa
      .addCase(getMahasiswa.pending, (state, action) => {
        return {
          ...state,
          getMahasiswaLoading: true,
          getMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(getMahasiswa.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getMahasiswaLoading: false,
          getMahasiswaError: undefined,
          type: action.type,
        };
      })
      .addCase(getMahasiswa.rejected, (state, action) => {
        return {
          ...state,
          getMahasiswaLoading: false,
          getMahasiswaError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: mahasiswaallAction, reducer: mahasiswaallReducer } =
  mahasiswaallSlice;
