
let output = "";

function updatePost(id) {
    location.href = `http://localhost:3000/users/updatepost?id=${id}`;
}




fetch("http://localhost:3000/users/me/post")
    .then(postData => postData.json())
    .then(postData => {
        if (postData.length == 0) throw new Error();
        postData.forEach(data => {
            output += `<div class="container">
            <div class="postUpdate">
                <h3 class='ownerName ownerNameAnim'>${capitalizeFirst(data.ownerName)}</h3>
                <p class="updateIcon" onclick=updatePost("${data._id}")><i class="fa fa-pencil-square" aria-hidden="true"></i></p>
            </div>
                <p class='createdAt'>${data.createdAt}</p>
                <p class='title'>${data.title}</p>
                <div class='like_dislike'>
                    <p class='like' onclick='likeOrDislike(this)' 
                        data-post-id=${data._id} data-owner-id=${data.owner}>
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <span class='likeCount'>${data.likeBy.length}</span>
                    </p>
                </div>
                </div>`;
        });
        document.querySelector("#myposts").innerHTML = output;
    }).catch(error => {
        document.querySelector("#myposts").innerHTML = `<div class="container">
                                                            <h3>No Post Found</h3>
                                                        </div>`;
    });