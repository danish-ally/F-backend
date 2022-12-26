module.exports = app => {
    const postComment = require("../controllers/postComment.controller.js");
    var router = require("express").Router();
    // Create a new Comment
    router.post("/", postComment.create);
    // Retrieve all Comments by Post Id
    router.get("/post/:postId", postComment.findAll);
    app.use('/api/post-comment', router);
  };