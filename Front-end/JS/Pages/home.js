import { fetchPosts } from "../API/postAndCom.js";
import { createComment } from "../Components/comment.js";
import { createPostItem } from "../Components/post.js";

let page = 1;

const typeManager = {
    post: 'news',
    question: 'ask',
    show: 'show',
    comment: 'comments'
}

export async function createMainPage(type = 'news') {
    const main = document.getElementById('main');
    main.innerHTML = '';

    const postList = document.createElement('ol');
    postList.classList.add('post-list');

    const moreButton = document.createElement('button');
    moreButton.innerText = 'More';
    moreButton.classList.add('more-button');


    await loadItems(postList)

    moreButton.addEventListener('click', async () => {
        await loadItems(postList);
        page++;
    })

    main.appendChild(postList)
    main.appendChild(moreButton)

    async function loadItems(postList) {
        console.log('typeManager[type]:', typeManager[type]);
        
        const items = await fetchPosts(typeManager[type], page);
        console.log(items);
        
        if (items.length == 0) {
            if (document.getElementById('noPosts')) return;

            const noMorePosts = document.createElement('p');
            noMorePosts.id = 'noPosts'
            noMorePosts.textContent = 'No posts available';
            postList.appendChild(noMorePosts);
            return;
        }

        let createItem = type == 'comment' ? createComment : createPostItem;

        items.forEach(element => {
            const postEl = createItem(element);
            postList.appendChild(postEl)
        });

    }
}