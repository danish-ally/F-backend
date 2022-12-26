const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class PostComment extends Model { }
    PostComment.init({
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
        comment: {
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
        modelName: 'postComment' // We need to choose the model name
    });

    PostComment.associate = (models) => {
        PostComment.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }
    PostComment.associate = (models) => {
        PostComment.belongsTo(models.user, { foreignKey: 'userId', as: 'users' })
    }

    return PostComment;
};

