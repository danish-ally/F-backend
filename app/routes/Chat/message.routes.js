module.exports = app => {
    const message = require("../../controllers/Chat/message.controller");
    var router = require("express").Router();
    // send a message
    router.post("/chat/:chatId/user/:userId", message.send);
    // Get all messages by chat id
    router.get("/chat/:chatId", message.getAllMessageByChatId)
    app.use('/api/message', router);


};