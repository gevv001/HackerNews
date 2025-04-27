import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { canEditItem } from "../Middleware/canEditItem.js";
import { writeComment } from "../Controllers/commentController.js";
import { getPageOf } from "../Controllers/getPageOf.js";
import { deleteItem } from "../Controllers/deleteItem.js";
let commentRoute = express.Router();

commentRoute.get('/', getPageOf('comment'));
commentRoute.post('/', authMiddleware, writeComment);
commentRoute.delete('/:id', authMiddleware, canEditItem('comment'), deleteItem);

export default commentRoute