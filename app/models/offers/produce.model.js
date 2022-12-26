const { UUID, Model, DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Produce extends Model {}
    Produce.init({
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        items:{
            type: DataTypes.TEXT, 
            get: function() {
                return JSON.parse(this.getDataValue('items'));
            }, 
            set: function(val) {
                return this.setDataValue('items', JSON.stringify(val));
            }
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        modelName: 'produce'
    });

    return Produce;
}        