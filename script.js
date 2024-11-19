// Data structure to store posts temporarily (in-memory)
let posts = [];

// Reference to DOM elements
const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
const submitPostButton = document.getElementById('submit-post');
const postsContainer = document.getElementById('posts-container');

// Handle post creation
submitPostButton.addEventListener('click', () => {
    const title = postTitleInput.value.trim();
    const body = postBodyInput.value.trim();

    if (title && body) {
        const newPost = {
            id: Date.now(), // Use timestamp as unique ID
            title: title,
            body: body,
            votes: 0
        };

        posts.push(newPost);
        renderPosts();
        postTitleInput.value = '';
        postBodyInput.value = '';
    }
});

// Handle upvote and downvote
function vote(postId, type) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (type === 'up') post.votes++;
        if (type === 'down') post.votes--;
        renderPosts();
    }
}

// Handle post deletion
function deletePost(postId) {
    posts = posts.filter(p => p.id !== postId);
    renderPosts();
}

// Render posts dynamically
function renderPosts() {
    postsContainer.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <div class="post-header">
                <h3>${post.title}</h3>
                <div>
                    <button onclick="deletePost(${post.id})">Delete</button>
                    <span class="votes">${post.votes} votes</span>
                </div>
            </div>
            <p>${post.body}</p>
            <div>
                <button onclick="vote(${post.id}, 'up')">Upvote</button>
                <button onclick="vote(${post.id}, 'down')">Downvote</button>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Initial render
renderPosts();
