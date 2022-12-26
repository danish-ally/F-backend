const db = require("../../models");
const Message = db.message;
const { sequelize, user } = require("../../models");
const Sequelize = require("sequelize");

// Send message
exports.send = (req, res) => {

    const message = {
        chatId: req.params.chatId,
        userId: req.params.userId,
        content: req.body.content,
    };
    console.log(":", message);

    if (!req.params.chatId || !req.params.userId || !req.body.content) {
        return res.status(500).send({
            message: "Please provide all required field!",
        });
    }

    // Save Message in the database
    Message.create(message)
        .then((data) => {

            return res.status(200).send({
                message: "Your message has been sent successfullly",
                data: data
            });

        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
};


// get All message by  chat id

exports.getAllMessageByChatId = async (req, res) => {
    const { chatId } = req.params;
    console.log("ss", chatId)
    const userId = req.query.userId;
    var result = []


    // update to seenBy 

    await sequelize.query(`
    UPDATE messages m
    SET "seenBy" = "seenBy" || ARRAY['${userId}']::uuid[][]
    where m."chatId" = ('${chatId}') 
    and m."userId" != ('${userId}') 
    and not("seenBy" @> ARRAY['${userId}']::uuid[][])`,
        { type: Sequelize.QueryTypes.SELECT })





    // end of update to seenBy 



    sequelize.query(`select m.id, u."userId", u."firstName", u."lastName", u.photo, m."content", m."createdAt" from messages m
    INNER JOIN users u ON "u"."userId" = m."userId"
    where m."chatId" = ('${chatId}') 
    ORDER BY "m"."createdAt"`,
        { type: Sequelize.QueryTypes.SELECT })
        .then(function (properties) {

            for (let i = 0; i < properties.length; i++) {
                const element = properties[i];
                if (element.userId === userId) {
                    result.push({ isSender: true, data: element })
                } else {
                    result.push({ isSender: false, data: element })
                }
            }
            res.send(result)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages by chat id."
            });
        });
}