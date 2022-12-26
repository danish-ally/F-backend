module.exports = app => {
    const postVoice = require("../controllers/postVoice.controller.js");
    var router = require("express").Router();
    // Create a new post Voice
    router.post("/", postVoice.create);
    // Retrieve all postVoice by Post Id
    router.get("post/:postId", postVoice.findAll);
    app.use('/api/post-voice', router);
  };