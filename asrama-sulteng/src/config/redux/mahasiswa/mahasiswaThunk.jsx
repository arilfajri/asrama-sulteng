import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create mahasiswa
export const createMahasiswa = createAsyncThunk(
  "mahasiswa/createMahasiswa",
  async (mahasiswaData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswas`,
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
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswas`,
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
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswa`,
        mahasiswaData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update data by id
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
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswas/${id}`,
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
          jenjang,
          status,
          ktp,
          kartu_keluarga,
          surat_ket_aktif_kuliah,
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

// delete data by id
export const deleteMahasiswa = createAsyncThunk(
  "mahasiswa/deleteMahasiswa",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswas/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get mahasiswa by id
export const getMahasiswaById = createAsyncThunk(
  "mahasiswa/getMahasiswaById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mahasiswas/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
