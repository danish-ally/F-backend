const { UUID, Model, DataTypes } = require("sequelize");
const login = require("../models/login.model");
// const login = require('./login.model');
// console.log('login', login)
module.exports = (sequelize, Sequelize) => {
    class Profile extends Model {}
    Profile.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        userId:{
            type: Sequelize.UUID,
            references: {
                model: "login",
                key: "id",
            }
        },
        mobileUniqueID:{
            type: Sequelize.STRING,
        }, 
        profilePicture:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        coverPicture:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        endorsed: {
            type: Sequelize.STRING,
            allowNull: true
        },
        genuine: {
            type: Sequelize.STRING,
            allowNull: true
        },
        followers: {
            type: Sequelize.STRING,
            allowNull: true
        },
        following: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gifts: {
            type: Sequelize.STRING,
            allowNull: true
        },
        occupation: {
            type: Sequelize.STRING,
            allowNull: true
        },
        education: {
            type: Sequelize.STRING,
            allowNull: true
        },
        maritalStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'profile'
    });

    Profile.associate = (models) => {
        // console.log("models", models.login)
        Profile.belongsTo(models.login, { foreignKey: 'userId'});
        // Profile.hasOne(models.home, { foreignKey: 'userId'});
    }
    
    return Profile;
}