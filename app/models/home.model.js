const { UUID, Model, DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Home extends Model {}
    Home.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        userId:{
            type: Sequelize.UUID,
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
            type: Sequelize.STRING
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'home'
    });

    return Home;
}        