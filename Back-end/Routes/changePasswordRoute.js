import express from "express";
import { changePassword } from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const changePasswordRoute = express.Router();

changePasswordRoute.post('/', authMiddleware, changePassword);

export default changePasswordRoute