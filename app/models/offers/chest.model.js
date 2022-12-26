const { UUID, Model, DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Chest extends Model {}
    Chest.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        offer:{
            type: DataTypes.TEXT, 
            get: function() {
                return JSON.parse(this.getDataValue('offer'));
            }, 
            set: function(val) {
                return this.setDataValue('offer', JSON.stringify(val));
            }
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'chest'
    });

    return Chest;
}        