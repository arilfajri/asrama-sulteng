import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Get all kamar
export const getAllKamar = createAsyncThunk(
  "kamar/kamardata",
  async (kamarData, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/kamar`, kamarData);
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
      const res = await axios.patch(`${API_BASE_URL}/kamar/${id}`, {
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

// Update Data by ID Admin
export const updateKamarByAdmin = createAsyncThunk(
  "kamar/updatekamarbyadmin",
  async (
    { id, nomor_kamar, fasilitas, gambar, mahasiswaId },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/kamar/admin/${id}`,
        {
          nomor_kamar,
          fasilitas,
          gambar,
          mahasiswaId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set header for FormData
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Kamar
export const createKamar = createAsyncThunk(
  "kamar/createKamar",
  async (kamar, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/kamar`, kamar, {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for FormData
        },
      });
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
      const res = await axios.delete(`${API_BASE_URL}/kamar/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Kamar by ID
export const getKamarById = createAsyncThunk(
  "kamar/getKamarById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/kamar/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
