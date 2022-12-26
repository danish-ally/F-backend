module.exports = app => {
    const activity = require("../controllers/activity.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", activity.create);
    // Retrieve all Users
    router.get("/", activity.findAll);
    app.use('/api/chatActivity', router);
  };