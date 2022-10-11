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

function goTo(e) {
    location.href = e.children[0].getAttribute("href");
}

nav_toggle.addEventListener("click", toggleNav);
document.querySelector(".cross-nav-sign").addEventListener("click", toggleNav);

if (!location.href.includes("/users/me")) {
    let home = document.querySelector(".nav-lists").children[0];
    home.classList.remove("active");
    // console.log(ulists);
}
else {
    let home = document.querySelector(".nav-lists").children[0];
    home.classList.add("active");
}