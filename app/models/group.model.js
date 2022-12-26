const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class Group extends Model { }
    Group.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        name: {
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
        modelName: 'group' // We need to choose the model name
    });

    return Group;
};

