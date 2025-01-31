import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get informasi
export const getInformasi = createAsyncThunk(
  "informasi/informasidata",
  async (informasiData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/informasi",
        informasiData
      );
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
        `https://asrama-sulteng-p58j.vercel.app/informasi/${id}`,
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
