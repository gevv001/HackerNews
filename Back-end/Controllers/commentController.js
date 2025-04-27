import Comment from "../Models/comment.js";
import { PostModel } from "../Models/post.js";

export const writeComment = async (req, res) => {
    const { text, postId, parentComId } = req.body;
    const { author } = req.user


    if (!text || !postId) {
        return res.status(400).json({ message: "Fields required" })
    }

    let post = await PostModel.findById(postId);

    if (!post) {
        return res.status(404).json({ message: "Post Not Found" })
    }

    if (parentComId) {
        const parentComment = await Comment.findById(parentComId);
        if (!parentComment) {
            return res.status(404).json({ message: "Parent comment not found" });
        }
    }

    let comment = await Comment.makeComment({ text, author, postId, parentComId })
    res.status(201).json({ message: "Comment created", comment })
}
