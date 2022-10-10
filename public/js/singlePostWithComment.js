let output = "";

const id = location.href.split("=")[1];
let commentData = `
    <div class='comment-form'>
        <form action='/users/me/post/addcomment/${id}' method='post'>
            <textarea class="inputBox commentTextArea" autofocus type='text' name='commentBody' placeholder='Comment here'></textarea>
            <input type='submit' value='Send'/>
        </form>
    </div>`;


// /users/me/post/:postId/delcomments/:commentId
function deleteComment(commentId) {
    fetch(`http://localhost:3000/users/me/post/${id}/delcomments/${commentId}?_method=DELETE`, { method: 'POST' })
        .then(() => {
            location.href = `http://localhost:3000/users/me/post/comment?id=${id}`
            console.log("comment deleted");
        })
}

function deleteButtonForCurrUser(currentUser, commentBy, commId) {
    // console.log("currentUser " + currentUser + "   &&   commentBy " + commentBy);
    if (currentUser == commentBy) {
        return `<i class="fa fa-trash" aria-hidden="true" onclick='deleteComment("${commId}")'></i>`
    }
    return `<p></p>`
}

function getAllCommentInHTML(id) {
    fetch(`http://localhost:3000/users/me/post/comments/${id}`)
        .then(dataJSON => dataJSON.json())
        .then(commentsData => {
            // comments = comments.reverse();
            const comments = commentsData["comments"];
            const currentUser = commentsData["currentUser"];
            comments.forEach(eachCommObj => {
                commentData += `
                    <div class='commentBoxSingle' id='${eachCommObj._id}'>
                        <div class='postUserName_Delete'>
                            <p class='ownerName'>${eachCommObj["userData"][0]["name"]}</p>
                            ${deleteButtonForCurrUser(currentUser, eachCommObj["commentBy"], eachCommObj._id)}
                        </div>
                        <p class='title'>${eachCommObj["commentBody"]}</p>
                    </div>`;
            });
            document.querySelector(".commentContainer").innerHTML = commentData;
        });
}


fetch(`http://localhost:3000/users/me/post/comment/${id}`)
    .then(data => data.json())
    .then(dataAll => {
        const data = dataAll["post"];
        getAllCommentInHTML(id);
        document.getElementById("singlePostWithComment").innerHTML = `
        <div class="container">
            <div class="postUpdate">
                <h3 class='ownerName ownerNameAnim'>${capitalizeFirst(data.ownerName)}</h3>
            </div>
            <p class='createdAt'>${data.createdAt}</p>
            <p class='title'>${data.title}</p>
            <div class='like_dislike'>
                <p class='like' onclick='likeOrDislike(this)' data-post-id=${data._id} data-owner-id=${data.owner}>
                ${likeButtonStyle(data.likeBy, dataAll["currentUser"])}
                <span class='likeCount'>${data.likeBy.length}</span>
                </p>
            </div>
        </div>
        <div class='comment-heading-div'>
            <h2 class='comment-heading'>Comments</h2>
        </div>
        <div class='commentContainer'>
            
        </div>
        `;
        // <div class='commentBoxAll'>
        //     ${getAllCommentInHTML(data.comments)}
        // <div>
        // <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
    });




{/* <div class='icon-update-delete'>
    <i class="fa fa-trash" aria-hidden="true" onclick='deletePost("${data._id}")'></i>
    <p class="" onclick=updatePost("${data._id}")><i class="fa fa-pencil-square" aria-hidden="true"></i></p>
</div> */}






