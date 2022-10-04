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

console.log("Before Fetch");
fetch("http://localhost:3000/users/post")
    .then(postData => {
        console.log("ABCD Fetch");
        return postData.json();
    }).then(postData => {
        postData.forEach(data => {
            console.log(data);
            // fetch(`http://localhost:3000/users/find/+${data.owner}`)
            //     .then(userData => userData.json())
            //     .then(userData => {
            //     });
            // });
            output += `<div class="container">
                    <h3>${userData.name}</h3>
                    <p>${data.createdAt}</p>
                    <p>${data.title}</p>
                </div>`;
            document.querySelector("#allContents").innerHTML = output;
        });
    });