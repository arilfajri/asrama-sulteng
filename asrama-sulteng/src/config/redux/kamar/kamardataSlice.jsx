import { createSlice } from "@reduxjs/toolkit";
import { getAllKamar } from "./kamarThunk";

const kamardataInitState = {
  data: [],
};

const kamardataSlice = createSlice({
  name: "kamardata",
  initialState: kamardataInitState,
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
      });
  },
});

export const { actions: kamardataAction, reducer: kamardataReducer } =
  kamardataSlice;
