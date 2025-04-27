import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { deletePost } from '../Controllers/postController.js';
import { canEditItem } from "../Middleware/canEditItem.js";
import { getPageOf } from "../Controllers/getPageOf.js";

let showRoute = express.Router();

showRoute.get('/', getPageOf('show'));
showRoute.delete('/:id', authMiddleware, canEditItem('post'), deletePost)


export default showRoute