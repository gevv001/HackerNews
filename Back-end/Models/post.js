import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: String,
    text: String,
    author: {
        id: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
        username: { type: String, required: true }
    },
    type: {
        type: String,
        enum: ['post', 'question', 'show'],
        required: true
    }
}, { timestamps: true })

export const PostModel = mongoose.model('Post', postSchema);

class Post {
    static async create(type, { title, url, author, text }) {
        let modelObj = { title, author, type };

        if (url) modelObj.url = url;
        if (text) modelObj.text = text;

        const post = new PostModel(modelObj);
        await post.save();
        return post;
    }
}

export default Post