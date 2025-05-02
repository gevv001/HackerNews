import { getPaginatedItems } from "../Utils/getPaginatedItems.js"

export const getPageOf = (type) => {
    return async (req, res) => {

        let page = req.query?.page || 1
        page = +page

        const posts = await getPaginatedItems(type, page)

        res.json(posts)
    }
}