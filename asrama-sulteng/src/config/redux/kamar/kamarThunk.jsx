import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all kamar
export const getAllKamar = createAsyncThunk(
  "kamar/kamardata",
  async (kamarData, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/kamar", kamarData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Data by ID
export const updateKamar = createAsyncThunk(
  "kamar/updatekamar",
  async ({ id, nomor_kamar, fasilitas, mahasiswaId }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`http://localhost:5000/kamar/${id}`, {
        nomor_kamar,
        fasilitas,
        mahasiswaId,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
