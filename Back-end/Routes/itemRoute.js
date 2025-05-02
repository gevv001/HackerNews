import express from "express";
import { getItem } from "../Controllers/itemController.js";

const itemRoute = express.Router();

itemRoute.get('/:id', getItem)

export default itemRoute