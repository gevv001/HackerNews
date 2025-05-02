import { CommentModel } from "../Models/comment.js";
import { PostModel } from "../Models/post.js";

export const getItem = async (req, res) => {
    let { id } = req.params
    id = id.slice(1);
    if (!id) return res.status(400).json({ message: "Specify ID" });

    const post = await PostModel.findOne({ _id: id })
    if (!post) res.status(404).json({ message: "Post not found" });

    const comments = await CommentModel.find({ postId: id }).sort({ createdAt: 1 })

    let retObj = {
        post,
        comments
    }


    return res.json(retObj)
}