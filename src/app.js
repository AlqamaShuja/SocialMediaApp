require("./db/mongoose");
// const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const methodOverride = require("method-override");
// const socketio = require("socket.io"); 



const app = express();
// const server = http.createServer(app);
// const io = socketio(server);
const userRoute = require("./Router/user");
const postRoute = require("./Router/post");
const commentRoute = require("./Router/comment");
const pathToPublic = path.join(__dirname, "../public");


// handlebar setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views"));
hbs.registerPartials(path.join(__dirname, "../template/partials"));

// Middleware
app.use(express.static(pathToPublic));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));


// Routes Middleware
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);


// io.on("connection", (socket) => {
//     console.log("A new user has joined");
//     socket.on("newPost", (parameter1) => {
//         // io.emit("updateNewPost");
//         console.log("app.js New Post");
//         parameter1();
//     })
// })




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});