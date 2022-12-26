const db = require("../../models");
const ActivityAndUserStatusMapping = db.activityAndUserStatusMapping;
const { sequelize, user } = require("../../models");
const Sequelize = require("sequelize");

exports.updateStatus = (req, res) => {
    const userId = req.params.userId;
    const activityId = req.params.activityId;
    db.activityAndUserStatusMapping
        .update(req.body, {
            where: { userId: userId, activityId: activityId },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: " status updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
}