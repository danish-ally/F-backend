const { UUID, Model, DataTypes } = require("sequelize");
const profile = require('./profile.model');
// console.log("profile", profile)
module.exports = (sequelize, Sequelize) => {
    // const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;
    class Login extends Model {}
    Login.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING
        },
        // userId:{
        //     type: Sequelize.UUID,
        //     onDelete: "CASCADE",
        //     references: {
        //         model: 'profile',
        //         key: "id",
        //     }
        // },
        dob:{
            type: Sequelize.STRING,
        },
        gender:{
            type: Sequelize.STRING,
        },
        occupation:{
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
        latitude:{
            type: Sequelize.NUMERIC,
            allowNull: true
        },
        longitude:{
            type: Sequelize.NUMERIC,
            allowNull: true
        },
        mobile: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        },
        interest:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'login'
    });

    Login.associate = (models) => {
        // console.log("models", models.profile)
        Login.hasOne(models.profile, { foreignKey: 'userId'});
    }
    
    return Login;
}