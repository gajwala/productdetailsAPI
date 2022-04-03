import express from "express";
const router = express.Router();

import {
  createImages,
  deleteImage,
  updateImage,
  getAllImages,
  getImage,
} from "../controllers/images.js";

router.post("/create", createImages);
router.patch("/update/:id", updateImage);
router.delete("/delete/:id", deleteImage);
router.get("/getImages", getAllImages);
router.get("/getImage/:id", getImage);

export default router;
