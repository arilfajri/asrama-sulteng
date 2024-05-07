import { createSlice } from "@reduxjs/toolkit";
import { getAllKamar, updateKamar } from "./kamarThunk";

const kamarInitState = {
  data: [],
};

const kamarSlice = createSlice({
  name: "kamar",
  initialState: kamarInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllKamar
      .addCase(getAllKamar.pending, (state, action) => {
        return {
          ...state,
          getAllKamarLoading: true,
          getAllKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllKamar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          getAllKamarLoading: false,
          getAllKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(getAllKamar.rejected, (state, action) => {
        return {
          ...state,
          getAllKamarLoading: false,
          getAllKamarError: action.payload,
          type: action.type,
        };
      })

      // updateKamar
      .addCase(updateKamar.pending, (state, action) => {
        return {
          ...state,
          updateKamarLoading: true,
          updateKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(updateKamar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateKamarLoading: false,
          updateKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(updateKamar.rejected, (state, action) => {
        return {
          ...state,
          updateKamarLoading: false,
          updateKamarError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { actions: kamarAction, reducer: kamarReducer } = kamarSlice;
