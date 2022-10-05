const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        // minLength: 3,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ownerName: {
        type: String,
        required: true
    },
    likeBy: [{
        like: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
}, { timestamps: true });

postSchema.virtual("users", {
    ref: "User",
    localField: "owner",
    foreignField: "_id"
});


const Post = mongoose.model("Post", postSchema);


module.exports = Post;