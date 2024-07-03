import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all Keuangan
export const getAllKeuangan = createAsyncThunk(
  "keuangan/dataKeuangan",
  async (dataKeuangan, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/keuangan",
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
      const res = await axios.post(
        "https://asrama-sulteng-p58j.vercel.app/keuangan",
        keuangan,
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

// Update Data by ID
export const updateKeuangan = createAsyncThunk(
  "keuangan/updateKeuangan",
  async (
    { id, tanggal, keterangan, jenis, nominal, bukti_transaksi },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `https://asrama-sulteng-p58j.vercel.app/keuangan/${id}`,
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
      const res = await axios.delete(
        `https://asrama-sulteng-p58j.vercel.app/keuangan/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
