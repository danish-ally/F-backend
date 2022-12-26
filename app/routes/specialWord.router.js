module.exports = app => {
    const specialWord = require("../controllers/specialWord.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", specialWord.create);
    // Retrieve all Users
    router.get("/", specialWord.findAll);
    app.use('/api/special-word', router);
  };