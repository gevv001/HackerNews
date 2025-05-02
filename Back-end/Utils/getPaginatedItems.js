import { CommentModel } from "../Models/comment.js";
import { PostModel } from "../Models/post.js";

export const getPaginatedItems = async (type, page, sortBy = 'createdAt') => {    
    if (type == 'comment') {
        return await CommentModel.find()
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * 30)
        .limit(30)
        .populate('author', 'username')
        .populate('postId', 'title')
    }
    
    return await PostModel.find({type})
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * 30)
        .limit(30)
        .populate('author', 'username')
}