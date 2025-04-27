import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createPost } from "../Controllers/submitController.js";
const submitRoute = express.Router();

submitRoute.post('/', authMiddleware, createPost)

export default submitRoute