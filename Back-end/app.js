import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import connectDB from "./Config/db.js";
import apiRoutes from "./Routes/apiRoute.js";
import errorHandler from "./Middleware/errorHandler.js";
import cors from 'cors'
configDotenv();
let app = express();

app.use(cors());
app.use(express.json())
app.use('/api', apiRoutes)
app.use(errorHandler)


let PORT = process.env.PORT || 3000
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log('Server Running on port: ', PORT);
    })
})

