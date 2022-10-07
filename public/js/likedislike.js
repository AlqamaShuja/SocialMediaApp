function likeOrDislike(e) {
    let ownerId = e.getAttribute("data-owner-id");
    let postId = e.getAttribute("data-post-id");
    fetch(`http://localhost:3000/users/posts/${ownerId}/${postId}`)
        .then(count => count.json())
        .then(count => {
            e.children[1].innerHTML = count.like;
        });
}