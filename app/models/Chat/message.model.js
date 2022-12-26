const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class Message extends Model { }
    Message.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },


        chatId: {
            type: Sequelize.UUID,
            references: {
                model: "chats",
                key: "id",
            },
        },

        userId: {
            type: Sequelize.UUID,

        },
        content: {
            type: Sequelize.STRING,
        },



        seenBy: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: []

        },




    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'message' // We need to choose the model name
    });


    return Message;
};

