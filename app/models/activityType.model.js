const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class ActivityType extends Model { }
    ActivityType.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING,
            // allowNull:false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'activityType' // We need to choose the model name
    });

    return ActivityType;
};

