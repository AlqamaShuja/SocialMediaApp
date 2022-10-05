console.log("Client side");


let output = "";

fetch("http://localhost:3000/users/posts")
    .then(postData => postData.json())
    .then(postData => {
        postData.forEach(data => {
            output += `<div class="container">
                    <h3 class='ownerName'>${data.ownerName}</h3>
                    <p>${data.updatedAt}</p>
                    <p>${data.title}</p>
                    <div class='like_dislike'>
                        <p class='like'><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></p>
                        <p class='dislike'><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></p>
                    </div>
                </div>`;
            });
        document.querySelector("#allContents").innerHTML = output;
    }).catch(error => {
        document.querySelector("#allContents").innerHTML = `<div class="container">
                                                                <h3>No Post Found</h3>
                                                            </div>`;
    });

if(document.querySelector(".like_dislike")){
    document.querySelector(".like").addEventListener("click", function(){
        console.log("Like clicked");
    });
}
