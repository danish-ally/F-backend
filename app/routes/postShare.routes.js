module.exports = app => {
    const PostShare = require("../controllers/postShare.controller.js");
    var router = require("express").Router();
    // Create a new PostShare
    router.post("/", PostShare.create);
    // Retrieve all PostShare by postId
    router.get("post/:postId", PostShare.findAll);
    app.use('/api/post-share', router);
  };