import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all kamar
export const getAllKamar = createAsyncThunk(
  "kamar/kamardata",
  async (kamarData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/kamar",
        kamarData
      );
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
      const res = await axios.patch(
        `https://asrama-sulteng-p58j.vercel.app/kamar/${id}`,
        {
          nomor_kamar,
          fasilitas,
          mahasiswaId,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Data by ID Admin
export const updateKamarByAdmin = createAsyncThunk(
  "kamar/updatekamarbyadmin",
  async (
    { id, nomor_kamar, fasilitas, gambar, mahasiswaId },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `https://asrama-sulteng-p58j.vercel.app/kamar/admin/${id}`,
        {
          nomor_kamar,
          fasilitas,
          gambar,
          mahasiswaId,
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

// createKamar
export const createKamar = createAsyncThunk(
  "kamar/createKamar",
  async (kamar, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://asrama-sulteng-p58j.vercel.app/kamar",
        kamar,
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
export const deleteKamar = createAsyncThunk(
  "kamar/deleteKamar",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://asrama-sulteng-p58j.vercel.app/kamar/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// getKamarById
export const getKamarById = createAsyncThunk(
  "kamar/getKamarById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://asrama-sulteng-p58j.vercel.app/kamar/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
