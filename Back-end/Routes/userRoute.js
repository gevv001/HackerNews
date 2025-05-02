import express from "express";
import { viewUserProfile, updateData } from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.get('/:username', authMiddleware, viewUserProfile);
userRoute.put('/', authMiddleware, updateData);


export default userRoute