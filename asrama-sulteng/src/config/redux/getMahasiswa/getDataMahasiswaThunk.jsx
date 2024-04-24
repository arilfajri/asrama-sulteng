import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get_mahasiswa = createAsyncThunk(
  "mahasiswa/get_mahasiswa",
  async (_, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get("http://localhost:3000/mahasiswa");
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);
