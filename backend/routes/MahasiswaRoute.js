import express from "express";
import {
  getMahasiswa,
  getMahasiswaById,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getAllMahasiswa,
} from "../controllers/MahasiswaController.js";
import { verifyUser } from "../index.js";

const router = express.Router();

router.get("/mahasiswas", verifyUser, getMahasiswa);
router.get("/mahasiswa", getAllMahasiswa);
router.get("/mahasiswas/:id", verifyUser, getMahasiswaById);
router.post("/mahasiswas", verifyUser, createMahasiswa);
router.patch("/mahasiswas/:id", verifyUser, updateMahasiswa);
router.delete("/mahasiswas/:id", verifyUser, deleteMahasiswa);

export default router;
