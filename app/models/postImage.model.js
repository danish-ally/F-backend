const { Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    class PostImage extends Model { }
    PostImage.init({
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
        image: {
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
        modelName: 'postImage' // We need to choose the model name
    });

    PostImage.associate = (models) => {
        PostImage.belongsTo(models.post, { foreignKey: 'id', as: 'posts' })
    }

    return PostImage;
};

