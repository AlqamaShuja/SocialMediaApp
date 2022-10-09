const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postOnComment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
});


commentSchema.virtual("users", {
    ref: "User",
    localField: "commentBy",
    foreignField: "_id"
});

// commentSchema.methods.toJSON = function () {
//     const comment = this;
//     const commentObj = comment.toObject();
//     console.log(commentObj);
//     delete commentObj.userData.password;
//     delete commentObj.userData.tokens;
//     delete commentObj.userData.friendLists;
//     delete commentObj.userData.postLists;
//     commentObj.userData = newUserData;
//     return commentObj
// }


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;