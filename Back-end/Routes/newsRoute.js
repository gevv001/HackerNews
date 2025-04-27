import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { deletePost } from '../Controllers/postController.js';
import { getPageOf } from "../Controllers/getPageOf.js";
import { canEditItem } from "../Middleware/canEditItem.js";
let newsRoute = express.Router();

newsRoute.get('/', getPageOf('post'));
newsRoute.delete('/:id', authMiddleware, canEditItem('post'), deletePost)

export default newsRoute