import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createMahasiswa = createAsyncThunk(
  "mahasiswa/createMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/mahasiswas",
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
        "http://localhost:5000/mahasiswas",
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
      status,
      ktp,
      kartu_keluarga,
      surat_ket_aktif_kuliah,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`http://localhost:5000/mahasiswas/${id}`, {
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
        ktp,
        kartu_keluarga,
        surat_ket_aktif_kuliah,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
