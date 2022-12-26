const db = require("../../models");
const Activity = db.activity;
const UserActivityTimingMapping = db.userActivityTimingMapping
const { sequelize, user } = require("../../models");
const Sequelize = require("sequelize");

// Create Activity
exports.create = (req, res) => {

    const activity = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        activityName: req.body.activityName,
        assignTo: req.body.assignTo,
        groupId: req.body.groupId,
        groupName: req.body.groupName,
        users: req.body.users,
        message: req.body.message,
        createdBy: req.body.createdBy,
    };
    console.log("activity:", activity);

    // Save Activity in the database
    Activity.create(activity)
        .then(async (data) => {

            // Save activityAndGroupStatusMapping in the database
            for (let i = 0; i < req.body.users.length; i++) {
                await db.activityAndUserStatusMapping.create({
                    userId: req.body.users[i],
                    activityId: data.id,
                });
            }


            return res.status(200).send({
                message: "Activity has been created successfullly",
            });

        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
};


// get Activity by activityId

exports.getByActivityId = async (req, res) => {

    const activityId = req.params.id;
    // getting activity by its id

    await sequelize.query(`select * from activities a 
    where a."id" = ('${activityId}') `,
        { type: Sequelize.QueryTypes.SELECT })
        .then(async function (properties) {
            var user = [];
            var userId = properties[0].users;


            // getting user details by user id

            for (let i = 0; i < userId.length; i++) {
                const id = userId[i];
                await sequelize.query(`select * from users u 
                where u."userId" = ('${id}') `,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (properties) {
                        await user.push(properties[0])
                    })
            }

            // inserting one new users details field 
            properties[0]['users'] = await user


            var userWithStatus = []

            for (let i = 0; i < properties[0].users.length; i++) {
                const userId = properties[0].users[i].userId;
                console.log(userId)

                await sequelize.query(`select * from "activityAndUserStatusMappings" aausm 
                where aausm."userId" = ('${userId}') and  aausm."activityId" = ('${activityId}')`,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data) {
                        await userWithStatus.push(data[0])


                    })


                properties[0].users[i]['status'] = await userWithStatus[i].status

            }



            res.send(properties)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages by chat id."
            });
        });
}


// update activity

exports.update = (req, res) => {
    const id = req.params.id;
    db.activity
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
                    message: `Cannot update Activities with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating activity details with id=" + id,
            });
        });
};







// get All activity BY UserId---------------- by present date, week , month, year
exports.getAll = async (req, res) => {

    const query = req.query;
    const userId = req.params.userId

    console.log(query)


    if (!query.today && !query.week && !query.month && !query.year) {

        await sequelize.query(`select * from activities 
        where "createdBy" = ('${userId}') `,
            { type: Sequelize.QueryTypes.SELECT })
            .then(async function (data1) {

                var properties = data1
                await sequelize.query(`select ac.id, ac."startDate", ac."endDate", ac."startTime", ac."endTime", ac."activityName", ac."assignTo", ac."groupId", ac."groupName", ac.users, ac.message, ac."createdBy", ac."createdBy", ac."isActive", ac."createdAt", ac."updatedAt" 
                from "activityAndUserStatusMappings" a
                    INNER JOIN activities ac ON "ac"."id" = a."activityId"
                    where a."userId" = ('${userId}') and a.status = 'ACCEPTED' `,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data2) {
                        console.log("data2:", data2)
                        // properties =await data1 + data2

                        for (let i = 0; i < data2.length; i++) {
                            const element = data2[i];
                            await properties.push(element)
                        }
                    })


                console.log("dataa:", properties)
                for (let i = 0; i < properties.length; i++) {
                    const element1 = properties[i];

                    var temp = []

                    for (let j = 0; j < element1.users.length; j++) {
                        const userId = element1.users[j];
                        await sequelize.query(`select * from users u 
                    where u."userId" = ('${userId}') `,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                await temp.push(data[0])
                            })
                    }


                    element1['users'] = await temp;
                }


                // for (let k = 0; k < properties.length; k++) {
                //     const element = properties[k];

                //     await delete element.group


                // }

                res.send(properties)

            })
    }


    if (query.today) {
        await sequelize.query(`select * from activities a 
        where "createdAt"::date  = now()::date and "createdBy" = ('${userId}')`,
            { type: Sequelize.QueryTypes.SELECT })
            .then(async function (data1) {

                var properties = data1
                await sequelize.query(`select ac.id, ac."startDate", ac."endDate", ac."startTime", ac."endTime", ac."activityName", ac."assignTo", ac."groupId", ac."groupName", ac.users, ac.message, ac."createdBy", ac."createdBy", ac."isActive", ac."createdAt", ac."updatedAt" 
                from "activityAndUserStatusMappings" a
                    INNER JOIN activities ac ON "ac"."id" = a."activityId"
                    where a."userId" = ('${userId}') and a.status = 'ACCEPTED' `,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data2) {
                        console.log("data2:", data2)
                        // properties =await data1 + data2

                        for (let i = 0; i < data2.length; i++) {
                            const element = data2[i];
                            await properties.push(element)
                        }
                    })


                console.log("dataa:", properties)
                for (let i = 0; i < properties.length; i++) {
                    const element1 = properties[i];

                    var temp = []

                    for (let j = 0; j < element1.users.length; j++) {
                        const userId = element1.users[j];
                        await sequelize.query(`select * from users u 
                    where u."userId" = ('${userId}') `,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                await temp.push(data[0])
                            })
                    }


                    element1['users'] = await temp;
                }


                // for (let k = 0; k < properties.length; k++) {
                //     const element = properties[k];

                //     await delete element.group


                // }

                res.send(properties)
            })
    }


    if (query.week) {
        await sequelize.query(`Select * From activities a  
        where date_trunc('week', now()) <= "createdAt"  AND
        "createdAt"  < date_trunc('week', now()) + '1 week'::interval and "createdBy" = ('${userId}')`,
            { type: Sequelize.QueryTypes.SELECT })
            .then(async function (data1) {

                var properties = data1
                await sequelize.query(`select ac.id, ac."startDate", ac."endDate", ac."startTime", ac."endTime", ac."activityName", ac."assignTo", ac."groupId", ac."groupName", ac.users, ac.message, ac."createdBy", ac."createdBy", ac."isActive", ac."createdAt", ac."updatedAt" 
                from "activityAndUserStatusMappings" a
                    INNER JOIN activities ac ON "ac"."id" = a."activityId"
                    where a."userId" = ('${userId}') and a.status = 'ACCEPTED' `,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data2) {
                        console.log("data2:", data2)
                        // properties =await data1 + data2

                        for (let i = 0; i < data2.length; i++) {
                            const element = data2[i];
                            await properties.push(element)
                        }
                    })


                console.log("dataa:", properties)
                for (let i = 0; i < properties.length; i++) {
                    const element1 = properties[i];

                    var temp = []

                    for (let j = 0; j < element1.users.length; j++) {
                        const userId = element1.users[j];
                        await sequelize.query(`select * from users u 
                    where u."userId" = ('${userId}') `,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                await temp.push(data[0])
                            })
                    }


                    element1['users'] = await temp;
                }


                // for (let k = 0; k < properties.length; k++) {
                //     const element = properties[k];

                //     await delete element.group


                // }

                res.send(properties)

            })
    }


    if (query.month) {
        await sequelize.query(`Select * From activities a  
        where date_trunc('month', now()) <= "createdAt"  AND
        "createdAt"  < date_trunc('month', now()) + '1 month'::interval and "createdBy" = ('${userId}')`,
            { type: Sequelize.QueryTypes.SELECT })
            .then(async function (data1) {

                var properties = data1
                await sequelize.query(`select ac.id, ac."startDate", ac."endDate", ac."startTime", ac."endTime", ac."activityName", ac."assignTo", ac."groupId", ac."groupName", ac.users, ac.message, ac."createdBy", ac."createdBy", ac."isActive", ac."createdAt", ac."updatedAt" 
                from "activityAndUserStatusMappings" a
                    INNER JOIN activities ac ON "ac"."id" = a."activityId"
                    where a."userId" = ('${userId}')  and a.status = 'ACCEPTED'`,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data2) {
                        console.log("data2:", data2)
                        // properties =await data1 + data2

                        for (let i = 0; i < data2.length; i++) {
                            const element = data2[i];
                            await properties.push(element)
                        }
                    })


                console.log("dataa:", properties)
                for (let i = 0; i < properties.length; i++) {
                    const element1 = properties[i];

                    var temp = []

                    for (let j = 0; j < element1.users.length; j++) {
                        const userId = element1.users[j];
                        await sequelize.query(`select * from users u 
                    where u."userId" = ('${userId}') `,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                await temp.push(data[0])
                            })
                    }


                    element1['users'] = await temp;
                }


                // for (let k = 0; k < properties.length; k++) {
                //     const element = properties[k];

                //     await delete element.group


                // }

                res.send(properties)

            })
    }

    if (query.year) {
        await sequelize.query(`Select * From activities a  
        where date_trunc('year', now()) <= "createdAt"  AND
        "createdAt"  < date_trunc('year', now()) + '1 year'::interval and "createdBy" = ('${userId}')`,
            { type: Sequelize.QueryTypes.SELECT })
            .then(async function (data1) {

                var properties = data1
                await sequelize.query(`select ac.id, ac."startDate", ac."endDate", ac."startTime", ac."endTime", ac."activityName", ac."assignTo", ac."groupId", ac."groupName", ac.users, ac.message, ac."createdBy", ac."createdBy", ac."isActive", ac."createdAt", ac."updatedAt" 
                from "activityAndUserStatusMappings" a
                    INNER JOIN activities ac ON "ac"."id" = a."activityId"
                    where a."userId" = ('${userId}') and a.status = 'ACCEPTED' `,
                    { type: Sequelize.QueryTypes.SELECT })
                    .then(async function (data2) {
                        console.log("data2:", data2)
                        // properties =await data1 + data2

                        for (let i = 0; i < data2.length; i++) {
                            const element = data2[i];
                            await properties.push(element)
                        }
                    })


                console.log("dataa:", properties)
                for (let i = 0; i < properties.length; i++) {
                    const element1 = properties[i];

                    var temp = []

                    for (let j = 0; j < element1.users.length; j++) {
                        const userId = element1.users[j];
                        await sequelize.query(`select * from users u 
                    where u."userId" = ('${userId}') `,
                            { type: Sequelize.QueryTypes.SELECT })
                            .then(async function (data) {
                                await temp.push(data[0])
                            })
                    }


                    element1['users'] = await temp;
                }


                // for (let k = 0; k < properties.length; k++) {
                //     const element = properties[k];

                //     await delete element.group


                // }

                res.send(properties)
            })
    }


};



// Set Started Time of activity by user

exports.setStartedTime = (req, res) => {

    const data = {
        activityId: req.params.activityId,
        userId: req.params.userId,
        startedTime: req.body.startedTime
    };

    console.log("data:", data);

    // Save started time in the database
    UserActivityTimingMapping.create(data)
        .then(async (data) => {

            return res.status(200).send({
                message: "Successfullly save started time",
                data: data
            });

        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred.",
            });
        });
};



// Set Ended time of activity by user

exports.setEndedTime = (req, res) => {
    db.userActivityTimingMapping
        .update(req.body, {
            where: { activityId: req.params.activityId, userId: req.params.userId },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Successfully save ended time.",
                });
            } else {
                res.send({
                    message: `Cannot update.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating activity details with id=" + id,
            });
        });
};

