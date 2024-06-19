import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// get all keuangan
export const getAllKeuangan = createAsyncThunk(
  "keuangan/dataKeuangan",
  async (dataKeuangan, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/keuangan`, dataKeuangan);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create keuangan
export const createKeuangan = createAsyncThunk(
  "keuangan/createKeuangan",
  async (keuangan, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/keuangan`, keuangan, {
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

// update keuangan
export const updateKeuangan = createAsyncThunk(
  "keuangan/updateKeuangan",
  async (
    { id, tanggal, keterangan, jenis, nominal, bukti_transaksi },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/keuangan/${id}`,
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

// delete keuangan
export const deleteKeuangan = createAsyncThunk(
  "keuangan/deleteKeuangan",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/keuangan/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
