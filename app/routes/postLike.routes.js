module.exports = app => {
    const postLike = require("../controllers/postLike.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", postLike.create);
    // Retrieve all Users
    router.get("/post/:postId", postLike.findAll);
    app.use('/api/post-likes', router);
  };