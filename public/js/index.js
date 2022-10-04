console.log("Client side");
let nav_toggle = document.querySelector(".nav-toggle");
let nav_side_box = document.querySelector(".nav-side-box");

function toggleNav() {
    if (nav_side_box.style.display === "block") {
        nav_side_box.style.display = "none";
    }
    else {
        nav_side_box.style.display = "block";
    }
}

nav_toggle.addEventListener("click", toggleNav);
document.querySelector(".cross-nav-sign").addEventListener("click", toggleNav);

let output = "";

fetch("http://localhost:3000/users/post")
.then(postData => {
    return postData.json();
}).then(postData => {
    postData.posts.forEach(data => {
        console.log(data);
        // output += `
        //     <div class="container">
        //         <h3>${postData.name}</h3>
        //         <p>${data.}</p>
        //         <p>Content should write here</p>
        //     </div>
        // `;
    });
});



document.querySelector("#allContents").innerHTML = output;
