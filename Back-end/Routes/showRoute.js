import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { canEditItem } from "../Middleware/canEditItem.js";
import { getPageOf } from "../Controllers/getPageOf.js";
import { deleteItem } from "../Controllers/deleteItem.js";

let showRoute = express.Router();

showRoute.get('/', getPageOf('show'));
showRoute.delete('/:id', authMiddleware, canEditItem('post'), deleteItem)


export default showRoute