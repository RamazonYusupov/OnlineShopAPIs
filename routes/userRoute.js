import express from "express";
import {
  gelAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/", gelAllUsers);
userRoute.get("/:id", getSingleUser);
userRoute.post("/", createNewUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

// Login User
userRoute.post("/login", login);

export default userRoute;
