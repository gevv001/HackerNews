import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { getPageOf } from "../Controllers/getPageOf.js";
import { canEditItem } from "../Middleware/canEditItem.js";
import { deleteItem } from "../Controllers/deleteItem.js";
let newsRoute = express.Router();

newsRoute.get('/', getPageOf('post'));
newsRoute.delete('/:id', authMiddleware, canEditItem('post'), deleteItem)

export default newsRoute