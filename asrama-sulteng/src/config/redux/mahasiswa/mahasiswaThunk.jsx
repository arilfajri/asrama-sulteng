import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createMahasiswa = createAsyncThunk(
  "mahasiswa/createMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/mahasiswas",
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all mahasiswa
export const getAllMahasiswa = createAsyncThunk(
  "mahasiswa/alldataMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/mahasiswas",
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
