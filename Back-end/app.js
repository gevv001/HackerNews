import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import connectDB from "./Config/db.js";
import apiRoutes from "./Routes/apiRoute.js";
configDotenv();
let app = express();

app.use(express.json())
app.use('/api', apiRoutes)


let PORT = process.env.PORT || 3000
PORT = 3003
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log('Server Running on port: ', PORT);
    })
})

