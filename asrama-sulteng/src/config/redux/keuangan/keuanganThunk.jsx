import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all keuangan
export const getAllKeuangan = createAsyncThunk(
  "keuangan/dataKeuangan",
  async (dataKeuangan, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/keuangan`,
        dataKeuangan
      );
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
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/keuangan`,
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

// update keuangan
export const updateKeuangan = createAsyncThunk(
  "keuangan/updateKeuangan",
  async (
    { id, tanggal, keterangan, jenis, nominal, bukti_transaksi },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/keuangan/${id}`,
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
      const res = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/keuangan/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
