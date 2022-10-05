

console.log("Client side");
let output = "";

async function countLike(postId) {
    // /users/posts/:postId
    let like;
    // const postId = e.getAttribute("data-post-id");
    count = await fetch(`http://localhost:3000/users/posts/${postId}`)
    count = await count.json();
    // console.log(count.like);
    // return count.like;
    document.querySelector(".likeCount").innerHTML = count.like;
}

function likeOrDislike(e) {
    // /users/posts/:ownerId/:postId
    // e.children[0].innerHTML = like;
    // console.log(e.children[1]);
    let ownerId = e.getAttribute("data-owner-id");
    let postId = e.getAttribute("data-post-id");
    fetch(`http://localhost:3000/users/posts/${ownerId}/${postId}`)
        .then(count => count.json())
        .then(count => {
            console.log(count);
            e.children[1].innerHTML = count.like;
        });

    // return count;
    countLike(postId);
}




fetch("http://localhost:3000/users/posts")
    .then(postData => postData.json())
    .then(postData => {
        postData.forEach(data => {
            output += `<div class="container">
                            <h3 class='ownerName'>${data.ownerName}</h3>
                            <p>${data.updatedAt}</p>
                            <p>${data.title}</p>
                            <div class='like_dislike'>
                                <p class='like' onclick='likeOrDislike(this)' data-post-id=${data._id} data-owner-id=${data.owner}><i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span class='likeCount'>${countLike(data._id)}</span></p>
                            </div>
                        </div>`;
            // <p class='dislike'><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></p>
        });
        document.querySelector("#allContents").innerHTML = output;
        // if (document.querySelector(".like_dislike")) {

        //     document.querySelector(".like").addEventListener("click", function () {

        //     });
        // }

    }).catch(error => {
        document.querySelector("#allContents").innerHTML = `<div class="container">
                                                                <h3>No Post Found</h3>
                                                            </div>`;
    });

