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
export const updateKeuangan = createAsyncThunk(
  "keuangan/updateKeuangan",
  async (
    { id, tanggal, keterangan, jenis, nominal, bukti_transaksi },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/keuangan/${id}`,
        {
          tanggal,
          keterangan,
          jenis,
          nominal,
          bukti_transaksi,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set header untuk FormData
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Data by ID
export const deleteKeuangan = createAsyncThunk(
  "keuangan/deleteKeuangan",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:5000/keuangan/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
