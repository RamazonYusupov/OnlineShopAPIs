import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getSingleProduct);
productRoute.post("/", createNewProduct);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
