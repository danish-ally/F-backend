const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class SpecialWord extends Model { }
    SpecialWord.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        word: {
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
        modelName: 'specialWord' // We need to choose the model name
    });

    return SpecialWord;
};

