

console.log("Client side"); 
let output = "";


if (window.location.href == "http://localhost:3000/users/me") { 
    fetch("http://localhost:3000/users/posts")
        .then(postData => postData.json())
        .then(postDataAll => {
            const postData = postDataAll["posts"];
            postData.forEach(async (data) => {
                output += `<div class="container">
                    <div class="postUpdate">
                        <h3 class='ownerName ownerNameAnim'>${capitalizeFirst(data.ownerName)}</h3>
                    </div>
                    <p class='createdAt'>${data.createdAt}</p>
                    <p class='title'>${data.title}</p>
                    <div class='like_dislike'>
                        <p class='like' onclick='likeOrDislike(this)'
                            data-post-id=${data._id} data-owner-id=${data.owner}>
                            ${likeButtonStyle(data.likeBy, postDataAll["currentUser"])}
                            <span class='likeCount'>${data.likeBy.length}</span>
                        </p>
                        <div class='commentBox'><a href='/users/me/post/comment?id=${data._id}' class='comment'>Comments</a></div>
                    </div>
                    </div>`;
                // <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            });
        })
        .catch(error => {
            output = `<div class="container">
            <h3>No Post Found</h3>
            </div>`;
        }).finally(() => {
            document.querySelector("#allContents").innerHTML = output;
        });
}
