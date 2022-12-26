const db = require("../../models");
const Chat = db.chat;
const UserChatMapping = db.userChatMapping
const { sequelize, user } = require("../../models");
const Sequelize = require("sequelize");

// Create Chat
exports.create = (req, res) => {

    const chat = {
        chatName: req.body.chatName,
        isGroupChat: req.body.isGroupChat,
        chatGroupId: req.body.chatGroupId,
    };
    console.log(":", chat);

    if (req.body.userChat.length === 0) {
        return res.status(500).send({
            message: "user chat can't be empty!",
        });
    }


    // Save Chat in the database
    Chat.create(chat)
        .then((data) => {
            // Save userChatMapping in the database
            for (let i = 0; i < req.body.userChat.length; i++) {
                db.userChatMapping.create({
                    chatId: data.id,
                    userId: req.body.userChat[i],
                });
            }

            if (req.body.userChat.length > 2) {
                const id = req.query.userId;
                UserChatMapping
                    .update({ isAdmin: true }, {
                        where: { userId: id },
                    })
            }

            return res.status(200).send({
                message: "Your chat has been created",
            });

        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the chat.",
            });
        });
};


// get chat list by user id

exports.findByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log("ss", userId)

    sequelize.query(`SELECT distinct c.id, "u"."userId", "u"."firstName", "u"."lastName", "u"."phoneNumber", "u"."photo" , "c"."isGroupChat", "c"."createdAt" ,"c"."chatName"
    FROM chats c JOIN "UserChatMappings" ON "UserChatMappings"."chatId" = c.id
    INNER JOIN users u ON "u"."userId" = "UserChatMappings"."userId"
    WHERE "UserChatMappings"."chatId" IN (select c.id from chats c right join  "UserChatMappings" ON "UserChatMappings"."chatId" = c.id
    where "UserChatMappings"."userId" = '${userId}'  AND c."isActive" = TRUE)
    AND "UserChatMappings"."userId" NOT IN ('${userId}')
    ORDER BY "c"."createdAt" `,
        { type: Sequelize.QueryTypes.SELECT })
        .then(function (properties) {


            // 1) GETTING ALL UNIQUE AND DUPLICATE OBJECT SEPRATELY
            const uniqObjs = [];
            const dupeObjs = [];

            properties.forEach(obj => [uniqObjs, dupeObjs][+(properties.map(obj => obj.id).filter(id => id === obj.id).length > 1)].push(obj));

            // 2) GETTING ALL DISTINCT OBJECT FROM DUBLICATE OBJECT


            const uniqueIds = [];

            const unique = dupeObjs.filter(element => {
                const isDuplicate = uniqueIds.includes(element.id);

                if (!isDuplicate) {
                    uniqueIds.push(element.id);

                    return true;
                }

                return false;
            });




            // 3) GETTING ALL USERS BY CHAT ID AND FORMAT IT


            var result = []

            for (let i = 0; i < unique.length; i++) {
                const elementId = unique[i].id;
                const chatName = unique[i].chatName;
                const isGroupChat = unique[i].isGroupChat;



                var user = [];

                for (let j = 0; j < properties.length; j++) {
                    const elementId2 = properties[j].id;
                    var userId = properties[j].userId;
                    var firstName = properties[j].firstName
                    var lastName = properties[j].lastName
                    var photo = properties[j].photo;
                    var phoneNumber = properties[j].phoneNumber
                    var createdAt = properties[j].createdAt
                    if (elementId === elementId2) {
                        user.push({ "userId": userId, "firstName": firstName, "lastName": lastName, "photo": photo, "phoneNumber": phoneNumber })
                    }

                }
                result.push({ "chatName": chatName, "chatId": elementId, "isGroupChat": isGroupChat, "createdAt": createdAt, users: user })

            }


            for (let k = 0; k < uniqObjs.length; k++) {
                const element = uniqObjs[k];

                result.push({ "chatName": element.firstName + " " + element.lastName, "chatId": element.id, "isGroupChat": element.isGroupChat, "createdAt": element.createdAt, "users": [{ "userId": element.userId, "firstName": element.firstName, "lastName": element.lastName, "photo": element.photo, "phoneNumber": element.phoneNumber }] })


            }





            sequelize.query(`select * from users u 
            where u."userId" = ('${req.params.userId}')`,
                { type: Sequelize.QueryTypes.SELECT })
                .then(async function (data) {
                    var userData = await data;
                    for (let i = 0; i < result.length; i++) {
                        const element = result[i];
                        if (element.isGroupChat === true) {

                            element.users.push({
                                "userId": userData[0].userId,
                                "firstName": userData[0].firstName,
                                "lastName": userData[0].lastName,
                                "photo": userData[0].photo,
                                "phoneNumber": userData[0].phoneNumber
                            })
                        }


                    }



                    // For Getting Last message and Last Message Time

                    var lastMessageObject = [];

                    for (let l = 0; l < result.length; l++) {
                        const chatId = await result[l].chatId;

                        await sequelize.query(`select * from messages m
            where m."chatId" = ('${chatId}')
            ORDER BY "m"."createdAt"`,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                console.log("data: ", data)
                                if (data.length !== 0) {
                                    result["lastMessage"] = await data[data.length - 1].content;
                                    await lastMessageObject.push({ 'chatId': data[data.length - 1].chatId, 'content': data[data.length - 1].content, 'createdAt': data[data.length - 1].createdAt })
                                } else {
                                    await lastMessageObject.push({ 'chatId': chatId, 'content': "No message  yet!", 'createdAt': result[l].createdAt })

                                }

                            })

                    }


                    console.log("lastMes", lastMessageObject)



                    var newResult = [];
                    for (let n = 0; n < result.length; n++) {
                        const element1 = await result[n];

                        for (let m = 0; m < lastMessageObject.length; m++) {
                            const element2 = lastMessageObject[m];
                            if (element1.chatId === element2.chatId) {
                                element1['lastMessage'] = await element2.content
                                element1['lastMessageTime'] = await element2.createdAt
                                console.log(element1)
                                await newResult.push(element1)
                            }

                        }






                    }


                    // Filtering Chat by latestMessage....

                    await newResult.sort(function (a, b) {
                        return new Date(a.lastMessageTime) - new Date(b.lastMessageTime)
                    })

                    await newResult.reverse()




                    var output = [];
                    // count unread message


                    for (let i = 0; i < newResult.length; i++) {
                        const element = newResult[i];

                        await sequelize.query(`select m.id, u."userId", u."firstName", u."lastName", u.photo, m."content",m."seenBy", m."createdAt" from messages m
                        INNER JOIN users u ON "u"."userId" = m."userId"
    where m."chatId" = ('${element.chatId}') and m."userId" != ('${req.params.userId}')`,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (properties1) {

                                var count1 = 0;
                                console.log(`${i}:`, properties1)
                                for (let k = 0; k < properties1.length; k++) {
                                    const element1 = properties1[k];
                                    console.log("dddd", properties1[k])
                                    if (element1.seenBy === []) {
                                        count1 += 1;
                                        console.log("insidee")
                                    }
                                    else {
                                        console.log("insidee")
                                        var check1 = false
                                        for (let k = 0; k < element1.seenBy.length; k++) {
                                            const element = element1.seenBy[k];
                                            console.log("sssss", element)

                                            if (req.params.userId === element) {
                                                check1 = true
                                            }

                                        }
                                        if (check1 === false) {
                                            count1 += 1;
                                        }
                                    }
                                }

                                element['unreadMessages'] = await count1
                                await output.push(element)

                            }).catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while retrieving messages by chat id."
                                });
                            });

                    }

                    res.send(output)



                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred."
                    });
                });


        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving chat list by user id."
            });
        });
}






// Add user in group chat
exports.addUser = (req, res) => {

    try {
        const id = req.params.chatId;
        console.log(req.body)
        for (let i = 0; i < req.body.userChat.length; i++) {
            db.userChatMapping.create({
                chatId: id,
                userId: req.body.userChat[i],
            });
        }
        res.status(200).json({
            success: true,
            message: "User Added successfully!",
        });
    } catch (error) {
        res.status(400).json({
            error: "Your request could not be processed. Please try again.",
            msg: error.message
        });
    }

};


// Edit group chat details or delete chat

exports.editGroupChatDetails = (req, res) => {
    const id = req.params.chatId;
    db.chat
        .update(req.body, {
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Chat with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Group details with id=" + id,
            });
        });
};

// get All group Chat

exports.getAllGroupChat = async (req, res) => {

    sequelize.query(`select * from chats c
    where c."isGroupChat" = true  and c."isActive" = true`,
        { type: Sequelize.QueryTypes.SELECT })
        .then(function (properties) {
            res.send(properties)
        })

}