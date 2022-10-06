

console.log("Client side");
let output = "";

// async function countLike(postId) {
//     count = await fetch(`http://localhost:3000/users/posts/${postId}`)
//     count = await count.json();
//     return count.like;
// }

function likeOrDislike(e) {
    // /users/posts/:ownerId/:postId
    // e.children[0].innerHTML = like;
    // console.log(e.children[1]);
    let ownerId = e.getAttribute("data-owner-id");
    let postId = e.getAttribute("data-post-id");
    fetch(`http://localhost:3000/users/posts/${ownerId}/${postId}`)
        .then(count => count.json())
        .then(count => {
            e.children[1].innerHTML = count.like;
        });

    // return count;
    // countLike(postId);
}




fetch("http://localhost:3000/users/posts")
    .then(postData => postData.json())
    .then(postData => {
        postData.forEach(async (data) => {
            // let like = await countLike(data._id);
            // const like = await countLike(data._id)
            output += `<div class="container">
                <h3 class='ownerName'>${data.ownerName}</h3>
                <p>${data.updatedAt}</p>
                <p>${data.title}</p>
                <div class='like_dislike'>
                    <p class='like' onclick='likeOrDislike(this)' 
                        data-post-id=${data._id} data-owner-id=${data.owner}>
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <span class='likeCount'>${data.likeBy.length}</span>
                    </p>
                </div>
            </div>`;
        });
    })
    .catch(error => {
        output = `<div class="container">
        <h3>No Post Found</h3>
        </div>`;
    }).finally(() => {
        document.querySelector("#allContents").innerHTML = output;
    })

console.log("Client side Index.js End");