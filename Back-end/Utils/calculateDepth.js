import { CommentModel } from "../Models/comment.js";

export async function calculateDepth(parentComId) {
    if (!parentComId) return 0;

    const parent = await CommentModel.findById(parentComId);
    return parent ? parent.depth + 1 : 0;
}
