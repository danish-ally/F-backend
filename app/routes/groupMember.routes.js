module.exports = app => {
    const groupMember = require("../controllers/groupMember.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", groupMember.create);
    // Retrieve all Users
    router.get("/user/:userId", groupMember.findAllByUserId);
    app.use('/api/group-member', router);
  };