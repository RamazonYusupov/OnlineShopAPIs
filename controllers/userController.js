import pool from "../connection.js";
import bcrypt from "bcrypt";

export const gelAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { email, password, name, role, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password, name, role, avatar)
       VALUES ($1, $2, $3, $4, $5) returning *`,
      [email, hashedPassword, name, role, avatar]
    );
    res
      .status(201)
      .json({ message: "Created Successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, name, role, avatar } = req.body;
    if (!email || !password || !name || !role || !avatar) {
      res.status(400).json({ message: "All the fields must be provided" });
    }
    const result = await pool.query(
      `UPDATE users SET
       email = $1,
       password = $2,
       name = $3,
       role = $4,
       avatar = $5
       WHERE id = $6 RETURNING *`,
      [email, password, name, role, avatar, id]
    );
    res
      .status(201)
      .json({ message: "Updated Successfully", obj: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Email or Password incorrect" });
      return;
    }
    const user = result.rows[0];
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(404).json({ message: "Email or Password incorrect" });
      return;
    }
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Sever error" });
  }
};
