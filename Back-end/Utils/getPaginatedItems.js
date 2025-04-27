import { PostModel } from "../Models/post.js";

export const getPaginatedItems = async (type, page, sortBy = 'createdAt') => {
    return await PostModel.find({type})
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * 30)
        .limit(30)
        .populate('author', 'username')
}