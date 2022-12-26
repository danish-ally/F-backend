const {Model, DataTypes} = require('sequelize');
const { user } = require('.');
const { USER } = require('../config/db.config');



module.exports = (sequelize, Sequelize) => {
    class Post extends Model {}
    Post.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.UUID,
            // allowNull:false,
            references:{
                model:'users',
                key:'userId',
                // deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        description:{
            type:Sequelize.STRING,
            // allowNull:false,
            // validate:{
            //     description:{msq:"Enter post content to continue!"}
            // }
        },
        location:{
            type:Sequelize.STRING,
            // allowNull:false,
            // validate:{
            //     description:{msq:"Enter post content to continue!"}
            // }
        },
    },{
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'post' // We need to choose the model name
      });

      Post.associate = (models) => {
          Post.belongsTo(models.user,{foreignKey:'userId',as :'users'})
      }
      Post.associte = (models) => {
        Post.hasMany(models.postLike,{foreignKey:'id', as :'postLikes'})
    }

    //   Post.belongsTo(User)
    return Post;
};

