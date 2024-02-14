import express from "express";

const userRoutes = express.Router();

import createUser from "../controllers/createUserController.js";
import editUserById from "../controllers/editUserController.js";

import { getAllUsers, getUserById } from "../controllers/getUserController.js";

import login from "../controllers/loginUserController.js";
import verifyToken from "../controllers/verifyTokenControler.js";
import refreshToken from "../controllers/refreshTokenController.js";
import logout from "../controllers/logoutUserController.js";
import changePassword from "../controllers/changePasswordController.js";

//Create user
userRoutes.post("/signup", createUser);

userRoutes.post("/login", login);

userRoutes.get("/home", verifyToken, getUserById);

//refresh token
userRoutes.get("/refresh", refreshToken, verifyToken, getUserById);

//Get all users
userRoutes.get("/all-users", getAllUsers);

//Get User by ID

userRoutes.get("/:id", getUserById);

//  Edit User by ID

userRoutes.put("/:id", editUserById);

userRoutes.patch("/change_password/:userId", changePassword);

userRoutes.post("/logout", verifyToken, logout);

export default userRoutes;
