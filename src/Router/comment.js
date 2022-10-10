const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Comment = require("../models/comments");
// const Post = require("../models/post");
const User = require("../models/user");
const route = require("express").Router();


// add comments to specific post
route.post("/users/me/post/addcomment/:postId", auth, async (req, res) => {
    try {
        const comment = new Comment({
            commentBody: req.body.commentBody,
            commentBy: req.user._id,
            postOnComment: req.params.postId
        });
        await comment.save();
        // res.send(comment);
        res.redirect(`/users/me/post/comment?id=${req.params.postId}`);
    } catch (error) {
        res.redirect(`/users/me/post/comment?id=${req.params.postId}`);
    }
});

// Read All Comment by post Id
route.get("/users/me/post/comments/:postId", auth, async (req, res) => {
    try {
        const data = await Comment.aggregate([
            {
                $match: {
                    'postOnComment': mongoose.Types.ObjectId(req.params.postId)
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: "commentBy",
                    foreignField: "_id",
                    as: 'userData'
                }
            }
        ]);
        res.send({ comments: data, currentUser: req.user._id });
    } catch (error) {
        res.send(error);
    }
});

route.get("/users/posts/comment/count/:postId", async (req, res) => {
    try {
        const commentCount = await Comment.find({ postOnComment: req.params.postId }).count();
        res.send({ count: commentCount });
    } catch (error) {
        res.send({ error: "Something went wrong" });
    }
});


// Delete Comment by Id
route.delete("/users/me/post/:postId/delcomments/:commentId", async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.commentId });
        res.redirect(`/users/me/post/comment?id=${req.params.postId}`);
    } catch (error) {
        res.redirect(`/users/me/post/comment?id=${req.params.postId}`);
    }
});


module.exports = route;