import express from "express";
import { getPageOf } from "../Controllers/getPageOf.js";
import { deletePost } from '../Controllers/postController.js';
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { canEditItem } from "../Middleware/canEditItem.js";

let askRoute = express.Router();

askRoute.get('/', getPageOf('question'));
askRoute.delete('/:id', authMiddleware, canEditItem('post'), deletePost)


export default askRoute