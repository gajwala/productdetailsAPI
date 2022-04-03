import express from "express";
const router = express.Router();

import {
  createVariant,
  deleteVariant,
  updateVariant,
  getAlVariants,
  getVariant,
} from "../controllers/variants.js";

router.post("/create", createVariant);
router.patch("/update", updateVariant);
router.delete("/delete/:id", deleteVariant);
router.get("/getVariants", getAlVariants);
router.get("/getVariant/:id", getVariant);

export default router;
