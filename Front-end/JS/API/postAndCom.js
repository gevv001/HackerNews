const BASE_URL = 'http://localhost:3000';

export const fetchPosts = async (type = 'news', page = 1) => {
    try {
        const url = `${BASE_URL}/api/${type}?page=1`
        console.log(url);
        
        const res = await fetch(url)
        console.log(res);
        
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