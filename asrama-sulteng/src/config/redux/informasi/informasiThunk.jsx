import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// get informasi
export const getInformasi = createAsyncThunk(
  "informasi/informasidata",
  async (informasiData, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/informasi`, informasiData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInformasi = createAsyncThunk(
  "informasi/updateInformasi",
  async (
    {
      id,
      deskripsi_singkat,
      visi,
      misi,
      alamat,
      email,
      no_hp,
      biaya,
      banner,
      struktur_organisasi,
      foto_deskripsi,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/informasi/${id}`,
        {
          deskripsi_singkat,
          visi,
          misi,
          alamat,
          email,
          no_hp,
          biaya,
          banner,
          struktur_organisasi,
          foto_deskripsi,
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
