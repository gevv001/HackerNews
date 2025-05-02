import mongoose from "mongoose";
import { CommentModel } from "../Models/comment.js";
import { PostModel } from "../Models/post.js";
import { UserModel } from "../Models/user.js";
import bcrypt from "bcryptjs";

export const viewUserProfile = async (req, res) => {
    let requestedUsername = req.params.username;
    requestedUsername = requestedUsername.slice(1)

    const loggedInUsername = req.user?.username;

    const user = await UserModel.findOne({ username: requestedUsername });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let query = { author: { id: user._id, username: user.username } };


    if (requestedUsername == loggedInUsername) {
        const posts = await PostModel.find(query).sort({ createdAt: -1 });
        const comments = await CommentModel.find(query).sort({ createdAt: -1 });

        return res.json({
            username: user.username,
            about: user.about,
            email: user.email,
            posts,
            comments,
        })
    } else {
        return res.json({
            username: user.username,
            about: user.about,
        })
    }
}

export const updateData = async (req, res) => {
    const { email, about } = req.body;
    const author = req.user;

    const user = await UserModel.findById({ _id: author.id })

    email ? user.email = email : '';
    about ? user.about = about : '';

    await user.save();

    res.json({
        message: 'User updated successfully',
        email: user.email,
        about: user.about,
    });
}

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Password change error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
