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
            owner: req.user._id
        });
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

        // const user = await User.findById(req.user.po);
        // await Post.find().populate("users");

        res.send({
            posts: req.user.posts
            //ownersData: req.user.posts.owner
        });
        
    } catch (error) {
        
    }
})



module.exports = route;