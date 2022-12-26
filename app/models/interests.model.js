const { UUID, Model, DataTypes } = require("sequelize");
const login = require('./login.model');
// console.log("login login", login)
module.exports = (sequelize, Sequelize) => {
    class Interest extends Model {}
    Interest.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        interest:{
            type: DataTypes.TEXT, 
            get: function() {
                return JSON.parse(this.getDataValue('interest'));
            }, 
            set: function(val) {
                return this.setDataValue('interest', JSON.stringify(val));
            }
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'interest'
    }
    );
    return Interest;
}