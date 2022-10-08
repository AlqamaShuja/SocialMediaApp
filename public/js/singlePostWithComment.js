let output="";

const id = location.href.split("=")[1];
fetch(`http://localhost:3000/users/me/post/comment/${id}`)
.then(data => data.json())
.then(data => {
    console.log(data);
});










{/* 
    <div class="container">
        <div class="postUpdate">
            <h3 class='ownerName ownerNameAnim'>${capitalizeFirst(data.ownerName)}</h3>
            <div class='icon-update-delete'>
                <i class="fa fa-trash" aria-hidden="true" onclick='deletePost("${data._id}")'></i>
                <p class="" onclick=updatePost("${data._id}")><i class="fa fa-pencil-square" aria-hidden="true"></i></p>
            </div>
        </div>
        <p class='createdAt'>${data.createdAt}</p>
        <p class='title'>${data.title}</p>
        <div class='like_dislike'>
            <p class='like' onclick='likeOrDislike(this)' data-post-id=${data._id} data-owner-id=${data.owner}>
                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                <span class='likeCount'>${data.likeBy.length}</span>
            </p>
        </div>
    </div> */}