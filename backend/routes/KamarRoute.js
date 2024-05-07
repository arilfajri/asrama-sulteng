import express from "express";

import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

import {
  createKamar,
  deleteKamar,
  getKamar,
  getKamarById,
  updateKamar,
} from "../controllers/KamarController.js";

const router = express.Router();

router.get("/kamar", verifyUser, getKamar);
router.get("/kamar/:id", verifyUser, getKamarById);
router.post("/kamar", verifyUser, adminOnly, createKamar);
router.patch("/kamar/:id", verifyUser, updateKamar);
router.delete("/kamar/:id", verifyUser, adminOnly, deleteKamar);

export default router;
