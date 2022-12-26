const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class GroupMember extends Model { }
    GroupMember.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
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
        modelName: 'groupMember' // We need to choose the model name
    });

    GroupMember.associate = (models) => {
        GroupMember.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }
    GroupMember.associate = (models) => {
        GroupMember.belongsTo(models.user, { foreignKey: 'userId', as: 'users' })
    }

    return GroupMember;
};

