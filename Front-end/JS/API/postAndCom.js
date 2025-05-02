const BASE_URL = 'http://localhost:3000';

export const fetchPosts = async (type = 'news', page = 1) => {
    try {
        const url = `${BASE_URL}/api/${type}?page=${page}`
        
        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to load posts: ', error);
        return []
    }
}