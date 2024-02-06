import express from "express";
import { addUserSchema, updateUserSchema } from "./user.validaftion.js";
import { validate } from "../../middlewares/validate.js";
import {
  addUser,
  deactivate,
  getUsers,
  signIn,
  updateUser,
  verifyAccount,
} from "./controller/user.controller.js";
import { auth, adminAuth } from "../../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.get("/users", getUsers);

userRoutes.post("/users", validate(addUserSchema), addUser);

userRoutes.post("/users/signin", signIn);

userRoutes.put("/users", auth, deactivate);

userRoutes.patch("/users", validate(updateUserSchema), adminAuth, updateUser);

userRoutes.get("/users/verify/:token", verifyAccount )

export default userRoutes;
