import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAlProducts,
  getProduct,
} from "../controllers/product.js";

router.post("/create", createProduct);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/getProducts", getAlProducts);
router.get("/getProduct/:id", getProduct);

export default router;
