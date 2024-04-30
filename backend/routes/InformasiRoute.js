import express from "express";

import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import {
  createInformasi,
  deleteInformasi,
  getInformasi,
  getInformasiById,
  updateInformasi,
} from "../controllers/InformasiController.js";

const router = express.Router();

router.get("/informasi", verifyUser, adminOnly, getInformasi);
router.get("/informasi/:id", verifyUser, adminOnly, getInformasiById);
router.post("/informasi", verifyUser, adminOnly, createInformasi);
router.patch("/informasi/:id", verifyUser, adminOnly, updateInformasi);
router.delete("/informasi/:id", verifyUser, adminOnly, deleteInformasi);

export default router;
