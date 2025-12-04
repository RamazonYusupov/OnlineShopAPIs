import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const categoryRoute = express.Router();

categoryRoute.get("/", getAllCategories);
categoryRoute.get("/:id", getSingleCategory);
categoryRoute.post("/", createCategory);
categoryRoute.put("/:id", updateCategory);
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;
