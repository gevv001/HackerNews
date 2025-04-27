import Post from "../Models/post.js";

export const createPost = async (req, res) => {
    const { title, text, url } = req.body;
    const author = { 
        id: req.user.id, 
        username: req.user.username
    }
    

    try {
        let type;
        if (!url) {
            type = 'question'
        } else {
            if (title.toLowerCase().startsWith('show hn:')) type = 'show';
            else type = 'post';
        }

        if (!type) throw new Error('Fields required')

        let post = await Post.create(type, { title, url, author, text })

        res.status(201).json({ message: "Post created", post })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post", error })
    }
}

