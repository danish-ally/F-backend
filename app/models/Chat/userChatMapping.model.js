const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class UserChatMapping extends Model { }
    UserChatMapping.init({
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
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    }, {
        sequelize,
        modelName: 'UserChatMapping'
    });
    return UserChatMapping;
};