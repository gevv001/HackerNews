import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import { configDotenv } from "dotenv";
configDotenv();
export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.register(username, password);

        res.status(201).json({ message: 'User registration successful', user: user.username })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.login(username, password);
        
        const token = jwt.sign({ id: user._id, username }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        
        res.json({ message: 'User logged in successfully', token, user: user.username })

    } catch (error) {
        console.error(error);
        
        res.status(400).json({ message: error.message })
    }
}