module.exports = app => {
  const chat = require("../../controllers/Chat/chat.controller");
  var router = require("express").Router();
  // Create a new Chat
  router.post("/", chat.create);
  // Get chat list by user id
  router.get("/list/user/:userId", chat.findByUserId)

  //Add contacts to group
  router.post("/:chatId", chat.addUser)
  // Edit Group Details
  router.put("/:chatId/edit", chat.editGroupChatDetails)
  // Get All group chat
  router.get("/group", chat.getAllGroupChat);
  app.use('/api/chat', router);


};