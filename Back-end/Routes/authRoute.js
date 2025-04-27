import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";

const authRoute = express.Router();

authRoute.post('/register', (req, res) => registerUser(req, res))
authRoute.post('/login', (req, res) => loginUser(req, res))

export default authRoute;
