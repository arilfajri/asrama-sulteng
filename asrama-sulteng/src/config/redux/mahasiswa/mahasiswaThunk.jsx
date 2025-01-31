import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createMahasiswa = createAsyncThunk(
  "mahasiswa/createMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://asrama-sulteng-p58j.vercel.app/mahasiswas",
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all mahasiswa
export const getAllMahasiswa = createAsyncThunk(
  "mahasiswa/alldataMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/mahasiswas",
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all mahasiswa
export const getMahasiswa = createAsyncThunk(
  "mahasiswa/allMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/mahasiswa",
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Data by ID
export const updateMahasiswa = createAsyncThunk(
  "mahasiswa/updateMahasiswa",
  async (
    {
      id,
      nama,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      email,
      no_hp,
      alamat_asal,
      universitas,
      jurusan,
      angkatan,
      jenjang,
      status,
      ktp,
      kartu_keluarga,
      surat_ket_aktif_kuliah,
      alasan,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `https://asrama-sulteng-p58j.vercel.app/mahasiswas/${id}`,
        {
          nama,
          jenis_kelamin,
          tempat_lahir,
          tanggal_lahir,
          email,
          no_hp,
          alamat_asal,
          universitas,
          jurusan,
          angkatan,
          status,
          jenjang,
          ktp,
          kartu_keluarga,
          surat_ket_aktif_kuliah,
          alasan,
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
export const deleteMahasiswa = createAsyncThunk(
  "mahasiswa/deleteMahasiswa",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://asrama-sulteng-p58j.vercel.app/mahasiswas/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// getMahasiswaById
export const getMahasiswaById = createAsyncThunk(
  "mahasiswa/getMahasiswaById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://asrama-sulteng-p58j.vercel.app/mahasiswas/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
