const route = require("express").Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const User = require("../models/user");



route.get("/posts", (req, res) => {
    res.send("Hello, JS");
});

route.post("/posts", auth, async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            owner: req.user._id,
            ownerName: req.user.name,
        });
        req.user.postLists = req.user.postLists.concat({ myPost: post._id });
        await req.user.save();
        await post.save();
        // res.send(post);
        res.redirect("/users/me")
    } catch (error) {
        res.send(error);
    }
    // res.send("Hello, JS");
});



// HBS
route.get("/users/newpost", auth, (req, res) => {
    res.render("newPost");
});

// Read All Post
route.get("/users/post", auth, async (req, res) => {
    try {
        await req.user.populate({
            path: "posts",
        });
        // console.log(req.user.posts);
        // await req.user.posts.populate({
        //     path: "users"
        // });

        // let data = await Post.find().populate("users");
        // await Post.find({}).populate("users").exec(function (err, data) {
        //     console.log(data);
        // });
        // console.log(req.user);
        // const user = await User.findById(req.user.po);
        // await Post.find().populate("users");

        // res.send(req.user.posts);
        res.send(req.user.posts);

    } catch (error) {

    }
})



module.exports = route;