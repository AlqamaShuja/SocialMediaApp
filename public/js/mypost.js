

let output = ""; 
fetch("http://localhost:3000/users/me/post")
.then(postData => postData.json())
.then(postData => {
    if(postData.length == 0) throw new Error();
    postData.forEach(data => {
        console.log(postData);
        output += `<div class="container">
                <h3 class='ownerName'>${data.ownerName}</h3>
                <p>${data.updatedAt}</p>
                <p>${data.title}</p>
            </div>`;
        });
    document.querySelector("#myposts").innerHTML = output;
}).catch(error => {
    document.querySelector("#myposts").innerHTML = `<div class="container">
                                                            <h3>No Post Found</h3>
                                                        </div>`;
});