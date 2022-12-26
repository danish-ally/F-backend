const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class PostShare extends Model { }
    PostShare.init({
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
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'postShare' // We need to choose the model name
    });

    PostShare.associate = (models) => {
        PostShare.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }
    PostShare.associate = (models) => {
        PostShare.belongsTo(models.user, { foreignKey: 'userId', as: 'users' })
    }

    return PostShare;
};

