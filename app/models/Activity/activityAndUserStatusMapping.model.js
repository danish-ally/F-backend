const { UUID } = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class ActivityAndUserStatusMapping extends Model { }
    ActivityAndUserStatusMapping.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },

        userId:{
            type: Sequelize.UUID

        },

        activityId: {
            type: Sequelize.UUID
        },

        status: {
            type: Sequelize.ENUM("SCHEDULED", "ACCEPTED", "DECLINED"),
            defaultValue: "SCHEDULED"
        },



    }, {
        sequelize,
        modelName: 'activityAndUserStatusMapping'
    });
    return ActivityAndUserStatusMapping;
};