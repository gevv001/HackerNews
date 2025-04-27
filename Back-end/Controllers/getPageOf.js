import { getPaginatedItems } from "../Utils/getPaginatedItems.js"

export const getPageOf = (type) => {
    return async (req, res) => {

        const { page } = req.query?.page || 1
        const posts = await getPaginatedItems(type, page)

        res.json(posts)
    }
}