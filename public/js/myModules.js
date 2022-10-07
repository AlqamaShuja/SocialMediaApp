function likeOrDislike(e) {
    let ownerId = e.getAttribute("data-owner-id");
    let postId = e.getAttribute("data-post-id");
    fetch(`http://localhost:3000/users/posts/${ownerId}/${postId}`)
        .then(count => count.json())
        .then(count => {
            e.children[1].innerHTML = count.like;
        });
    if (e.children[0].getAttribute("class") == "fa fa-thumbs-o-up") {
        e.children[0].removeAttribute("class");
        e.children[0].setAttribute("class", "fa fa-thumbs-up");
    }
    else {
        e.children[0].removeAttribute("class");
        e.children[0].setAttribute("class", "fa fa-thumbs-o-up");
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function likeButtonStyle(allLiker, currentUser) {
    let liked = false;
    allLiker.forEach(likerObj => {
        if (likerObj.like.toString() == currentUser.toString()) {
            liked = true;
        }
    });
    if (liked) return '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
    return '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>'
}