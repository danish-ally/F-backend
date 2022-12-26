const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class User extends Model { }
    User.init({
        userId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },

        countryCode: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        modelName: 'user'
    });
    User.associte = (models) => {
        User.hasMany(models.post, { foreignKey: 'userId', as: 'posts' })
    }
    User.associte = (models) => {
        User.hasMany(models.postLike, { foreignKey: 'id', as: 'postLikes' })
    }
    return User;
};