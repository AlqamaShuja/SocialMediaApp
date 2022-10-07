console.log("Client side");
let output = "";

if(window.location.href == "http://localhost:3000/users/me"){
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
        });
}

// if(window.location.href == "http://localhost:3000/users/mypost"){
//     fetch("http://localhost:3000/users/me/post")
//     .then(postData => postData.json())
//     .then(postData => {
//         if (postData.length == 0) throw new Error();
//         postData.forEach(data => {
//             output += `<div class="container">
//                 <h3 class='ownerName'>${data.ownerName}</h3>
//                 <p>${data.updatedAt}</p>
//                 <p>${data.title}</p>
//                 <div class='like_dislike'>
//                     <p class='like' onclick='likeOrDislike(this)' 
//                         data-post-id=${data._id} data-owner-id=${data.owner}>
//                         <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
//                         <span class='likeCount'>${data.likeBy.length}</span>
//                     </p>
//                 </div>
//                 </div>`;
//         });
//         document.querySelector("#allContents").innerHTML = output;
//     }).catch(error => {
//         document.querySelector("#allContents").innerHTML = `<div class="container">
//                                                             <h3>No Post Found</h3>
//                                                         </div>`;
//     });
// }