import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all Keuangan
export const getAllKeuangan = createAsyncThunk(
  "keuangan/dataKeuangan",
  async (dataKeuangan, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/keuangan",
        dataKeuangan
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// createKeuangan
export const createKeuangan = createAsyncThunk(
  "keuangan/createKeuangan",
  async (keuangan, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/keuangan", keuangan, {
        headers: {
          "Content-Type": "multipart/form-data", // Set header untuk FormData
        },
      });
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
