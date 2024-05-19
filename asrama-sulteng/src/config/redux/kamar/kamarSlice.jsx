import { createSlice } from "@reduxjs/toolkit";
import { createKamar, deleteKamar, updateKamar } from "./kamarThunk";

const kamarInitState = {
  data: [],
};

const kamarSlice = createSlice({
  name: "kamar",
  initialState: kamarInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createKamar
      .addCase(createKamar.pending, (state, action) => {
        return {
          ...state,
          createKamarLoading: true,
          createKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(createKamar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          createKamarLoading: false,
          createKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(createKamar.rejected, (state, action) => {
        return {
          ...state,
          createKamarLoading: false,
          createKamarError: action.payload,
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
      })

      // deleteKamar
      .addCase(deleteKamar.pending, (state, action) => {
        return {
          ...state,
          deleteKamarLoading: true,
          deleteKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(deleteKamar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          deleteKamarLoading: false,
          deleteKamarError: undefined,
          type: action.type,
        };
      })
      .addCase(deleteKamar.rejected, (state, action) => {
        return {
          ...state,
          deleteKamarLoading: false,
          deleteKamarError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetDataKamar } = kamarSlice.actions;

export const { actions: kamarAction, reducer: kamarReducer } = kamarSlice;
