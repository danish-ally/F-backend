const { UUID } = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class UserActivityTimingMapping extends Model { }
    UserActivityTimingMapping.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },

        userId: {
            type: Sequelize.UUID
        },

        activityId: {
            type: Sequelize.UUID
        },

        startedTime: {
            type: Sequelize.TIME,
        },

        endedTime: {
            type: Sequelize.TIME,

        },



    }, {
        sequelize,
        modelName: 'userActivityTimingMapping'
    });
    return UserActivityTimingMapping;
};