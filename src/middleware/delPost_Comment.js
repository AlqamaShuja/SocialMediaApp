const Post = require("../models/post");
const Comment = require("../models/comments");


async function deletePostAndRelatedComment(id) {
    const post = await Post.findById(id);
    if (!post) return;
    await Comment.deleteMany({ postOnComment: id });
    await post.remove();
    return;
}

module.exports = deletePostAndRelatedComment;