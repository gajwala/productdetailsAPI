import express from "express";
const router = express.Router();

import {
  createOptions,
  deleteOption,
  updateOptions,
  getAllOptions,
  getOption,
} from "../controllers/options.js";

router.post("/create", createOptions);
router.patch("/update/:id", updateOptions);
router.delete("/delete/:id", deleteOption);
router.get("/getOptions", getAllOptions);
router.get("/getOption/:id", getOption);

export default router;
