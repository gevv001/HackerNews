import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true }
    },
    postId: { type: mongoose.Schema.Types.ObjectID, ref: 'Post', required: true },
    parentComId: { type: mongoose.Schema.Types.ObjectID, ref: 'Comment', required: true },
}, { timestamps: true })

export const CommentModel = mongoose.model('Comment', commentSchema)

class Comment {
    static async makeComment({ text, author, postId, parentComId }) {
        let modelObj = { text, author, postId, parentComId };

        let comment = new CommentModel(modelObj)
        await comment.save();
        return comment;
    }

}

export default Comment
