import express from "express";

import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

import {
  createKeuangan,
  deleteKeuangan,
  getKeuangan,
  getKeuanganById,
  updateKeuangan,
} from "../controllers/KeuanganController.js";

const router = express.Router();

router.get("/keuangan", verifyUser, adminOnly, getKeuangan);
router.get("/keuangan/:id", verifyUser, adminOnly, getKeuanganById);
router.post("/keuangan", verifyUser, adminOnly, createKeuangan);
router.patch("/keuangan/:id", verifyUser, adminOnly, updateKeuangan);
router.delete("/keuangan/:id", verifyUser, adminOnly, deleteKeuangan);

export default router;
