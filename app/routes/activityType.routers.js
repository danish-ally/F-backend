module.exports = app => {
    const activityType = require("../controllers/activityType.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", activityType.create);
    // Retrieve all Users
    router.get("/", activityType.findAll);
    app.use('/api/activity-type', router);
  };