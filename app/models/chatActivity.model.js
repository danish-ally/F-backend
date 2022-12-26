const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class ChatActivity extends Model { }
    ChatActivity.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        // type: {
        //     type: Sequelize.UUID,
        //     // allowNull:false,
        //     references: {
        //         model: 'activityTypes',
        //         key: 'id',
        //         // deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     }
        // },
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
        modelName: 'chatActivity' // We need to choose the model name
    });

    // Activity.associate = (models) => {
    //     Activity.belongsTo(models.post, { foreignKey: 'id', as: 'activityTypes' })
    // }

    return ChatActivity;
};

