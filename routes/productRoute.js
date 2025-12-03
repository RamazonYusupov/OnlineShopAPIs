import pool from "../connection.js";
import express from "express";
const productRoute = express.Router();

// Get all Products
productRoute.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

// Get a single product
productRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// Create a new product
productRoute.post("/", async (req, res) => {
  try {
    const { title, price, description, image, categoryId } = req.body;
    const result = await pool.query(
      `INSERT INTO products (title, price, description, image, categoryId)
       VALUES ($1, $2, $3, $4, $5) returning *`,
      [title, price, description, image, categoryId]
    );
    res
      .status(201)
      .json({ message: "Added successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Update Product
productRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image, categoryId } = req.body;
    if (!title || !price || !description || !image || !categoryId) {
      res.status(400).json({ message: "All the fields must be provided" });
    }
    const result = await pool.query(
      `UPDATE products SET
        title = $1,
        price = $2,
        description = $3,
        image = $4,
        categoryId = $5
        WHERE id = $6 returning *`,
      [title, price, description, image, categoryId, id]
    );
    res
      .status(201)
      .json({ message: "Updated Successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Product
productRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).json({
      message: "Deleted successfully",
      deleted: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default productRoute;
