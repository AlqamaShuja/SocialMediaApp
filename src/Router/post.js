const route = require("express").Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const User = require("../models/user");



route.get("/users/posts", auth, async (req, res) => {
    const posts = await Post.find().sort({
        createdAt: -1
    });
    res.send({ posts, currentUser: req.user._id });
});

// Creting new Post
route.post("/posts", auth, async (req, res) => {
    try {
        console.log(req.body.title);
        const post = new Post({
            title: req.body.title,
            owner: req.user._id,
            ownerName: req.user.name,
        });
        req.user.postLists = req.user.postLists.concat({ myPost: post._id });
        await req.user.save();
        await post.save();
        res.redirect("/users/me");
    } catch (error) {
        res.send(error);
    }
});

// Update Post
route.patch("/posts/:id", auth, async (req, res) => { 
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return;
        post.title = req.body.title;
        await post.save();
        
        res.redirect("/users/mypost");
    } catch (error) {
        res.send(error);
    }
});

// Delete Post
route.delete("/posts/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return;
        await post.remove();
        res.send({ success: true });
    } catch (error) {
        res.send({ success: false });
    }
    // res.send("Hello, JS");
});

// Update like value in a specific post
route.get("/users/posts/:ownerId/:postId", auth, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if (!post) return;
    let isAlreadyAdd = false;
    post.likeBy.forEach(ownerObj => {
        if (ownerObj.like.equals(req.user._id)) {
            isAlreadyAdd = true;
        }
    });

    if (!isAlreadyAdd) {
        post.likeBy = post.likeBy.concat({ like: req.user._id });
    }
    else {
        let filteredList = post.likeBy.filter(ownerObj => ownerObj.like.toString() != req.user._id.toString());
        post.likeBy = filteredList;
    }
    await post.save();
    res.send({ like: post.likeBy.length });
});


// Comment on Post
route.get("/users/me/post/comment/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.redirect("/users/me");
        // res.render("postComment", {
        //     name: req.user.name,
        //     data: post
        // });
        res.send(post);
    } catch (error) {
        res.redirect("/users/me");
    }
});



// HBS
route.get("/users/newpost", auth, async (req, res) => {
    res.render("newPost", {
        name: req.user.name
    });
});

// Update Post
route.get("/users/updatepost", auth, async (req, res) => {
    const data = {
        name: req.user.name
    }
    if (req.query.id) {
        const post = await Post.findById(req.query.id);
        if (post) {
            data.id = req.query.id;
            data.title = post.title
            console.log(data);
            return res.render("postUpdate", data);
        }
        else {
            return res.render("newPost", data);
        }
    }
    console.log(data);
    res.render("newPost", data);
});

// Read Current User Post
route.get("/users/mypost", auth, (req, res) => {
    res.render("mypost", {
        name: req.user.name
    });
});

// Read All Post
route.get("/users/me/post", auth, async (req, res) => { 
    try {
        await req.user.populate({
            path: "posts",
            options: {
                sort: {
                    createdAt: 1
                }
            }
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
        res.status(404).send();
    }
});

// Comment on Post HBS
route.get("/users/me/post/comment", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.query.id);
        if(!post) return res.redirect("/users/me");
        res.render("postComment", {
            name: req.user.name,
            id: post._id
        });
        // res.send(post);
    } catch (error) {
        res.redirect("/users/me");
    }
});



module.exports = route;