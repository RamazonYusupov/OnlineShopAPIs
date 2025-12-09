import pool from "../connection.js";

export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM categories WHERE id = ${id}`
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const result = await pool.query(
      `INSERT INTO categories (name, image) VALUES ($1, $2) RETURNING *`,
      [name, image]
    );
    res
      .status(201)
      .json({ message: "Created Successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!name || !image) {
      res.status(400).json({ message: "All the fields must be provided" });
    }
    const result = await pool.query(
      `UPDATE categories SET
       name = $1,
       image = $2
       WHERE id = $3 RETURNING *`,
      [name, image, id]
    );
    res
      .status(201)
      .json({ message: "Updated Successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await pool.query(
      `DELETE FROM categories WHERE id = $1 RETURNING *`,
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
};
