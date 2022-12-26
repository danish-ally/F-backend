module.exports = app => {
    const post = require("../controllers/post.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", post.create);
    // Retrieve all Users
    router.get("/user/:userId", post.findAll);
    app.use('/api/post', router);
  };