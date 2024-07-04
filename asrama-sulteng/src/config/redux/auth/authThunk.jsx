import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://asrama-sulteng-p58j.vercel.app/users",
        userData,
        { withCredentials: true } // Menambahkan withCredentials
      );
      Swal.fire({
        icon: "success",
        title: "Register berhasil, silahkan login!",
      });
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email sudah terdaftar!",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://asrama-sulteng-p58j.vercel.app/login",
        userData,
        { withCredentials: true } // Menambahkan withCredentials
      );
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email atau password salah",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        "https://asrama-sulteng-p58j.vercel.app/logout",
        { withCredentials: true } // Menambahkan withCredentials
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Me
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://asrama-sulteng-p58j.vercel.app/me",
        { withCredentials: true } // Menambahkan withCredentials
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
