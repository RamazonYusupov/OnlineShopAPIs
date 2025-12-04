import express from "express";
import {
  gelAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/", gelAllUsers);
userRoute.get("/:id", getSingleUser);
userRoute.post("/", createNewUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
