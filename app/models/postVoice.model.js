const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class PostVoice extends Model { }
    PostVoice.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        postId: {
            type: Sequelize.UUID,
            // allowNull:false,
            references: {
                model: 'posts',
                key: 'id',
                // deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        userId: {
            type: Sequelize.UUID,
            // allowNull:false,
            references: {
                model: 'users',
                key: 'userId',
                // deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        voice: {
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
        modelName: 'postVoice' // We need to choose the model name
    });

    PostVoice.associate = (models) => {
        PostVoice.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }
    PostVoice.associate = (models) => {
        PostVoice.belongsTo(models.user, { foreignKey: 'userId', as: 'users' })
    }

    return PostVoice;
};

