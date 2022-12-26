const { UUID } = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class Activity extends Model { }
    Activity.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        startDate: {
            type: Sequelize.DATEONLY,
        },
        endDate: {
            type: Sequelize.DATEONLY,
        },
        startTime: {
            type: Sequelize.TIME,
        },
        endTime: {
            type: Sequelize.TIME,
        },

        activityName: {
            type: Sequelize.STRING,
        },
        assignTo: {
            type: Sequelize.UUID
        },

        groupId: {
            type: Sequelize.UUID
        },

        groupName: {
            type: Sequelize.STRING
        },

        users: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: []

        },
        message: {
            type: Sequelize.STRING,

        },
        createdBy: {
            type: Sequelize.UUID
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {
        sequelize,
        modelName: 'activity'
    });
    return Activity;
};