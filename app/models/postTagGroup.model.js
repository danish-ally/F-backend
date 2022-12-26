const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class PostTagGroup extends Model { }
    PostTagGroup.init({
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
        groupId: {
            type: Sequelize.UUID,
            // allowNull:false,
            references: {
                model: 'groups',
                key: 'id',
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
        modelName: 'postTagGroup' // We need to choose the model name
    });

    PostTagGroup.associate = (models) => {
        PostTagGroup.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }
    PostTagGroup.associate = (models) => {
        PostTagGroup.belongsTo(models.group, { foreignKey: 'id', as: 'groups' })
    }

    return PostTagGroup;
};

