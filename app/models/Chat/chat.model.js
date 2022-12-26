const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class Chat extends Model { }
    Chat.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        chatName: {
            type: Sequelize.STRING,
        },
        isGroupChat: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        // chatGroupId: {
        //     type: Sequelize.UUID,
        // },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {
        sequelize,
        modelName: 'chat'
    });
    return Chat;
};