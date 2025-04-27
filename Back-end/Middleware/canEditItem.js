import { CommentModel } from "../Models/comment.js"
import { PostModel } from "../Models/post.js"

export const canEditItem = (type) => {
    return async (req, res, next) => {
        const author = req.user

        let { id } = req.params
        id = id.slice(1)

        let item;
        switch (type) {
            case 'comment':
                item = await CommentModel.findById(id);
            case 'post':
                item = await PostModel.findById(id);
        }


        if (!item) {
            return res.status(404).json({ message: 'Item Not Found' })
        }

        if (author.id.toString() !== item.author.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        req.item = item
        next()
    }
}
