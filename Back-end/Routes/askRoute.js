import express from "express";
import { getPageOf } from "../Controllers/getPageOf.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { canEditItem } from "../Middleware/canEditItem.js";
import { deleteItem } from "../Controllers/deleteItem.js";

let askRoute = express.Router();

askRoute.get('/', getPageOf('question'));
askRoute.delete('/:id', authMiddleware, canEditItem('post'), deleteItem)


export default askRoute