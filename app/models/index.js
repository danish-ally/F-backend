const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig?.pool?.max,
        min: dbConfig?.pool?.min,
        acquire: dbConfig?.pool?.acquire,
        idle: dbConfig?.pool?.idle
      }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.login = require("./login.model.js")(sequelize, Sequelize);
db.interest = require("./interests.model.js")(sequelize, Sequelize);
db.profile = require("./profile.model.js")(sequelize, Sequelize);
db.chest = require("./offers/chest.model.js")(sequelize, Sequelize);
db.produce = require("./offers/produce.model.js")(sequelize, Sequelize);
db.home = require("./home.model.js")(sequelize, Sequelize);


db.user = require("./user.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.postLike = require("./postLike.model.js")(sequelize, Sequelize);
db.postComment = require("./postComment.model.js")(sequelize, Sequelize);
db.postVoice = require("./postVoice.model.js")(sequelize, Sequelize);
db.postShare = require("./postShare.model.js")(sequelize, Sequelize);
db.postImage = require("./postImage.model.js")(sequelize, Sequelize);
db.postTag = require("./postTag.model.js")(sequelize, Sequelize);
db.postTagGroup = require("./postTagGroup.model.js")(sequelize, Sequelize);
db.group = require("./group.model.js")(sequelize, Sequelize);
db.specialWord = require("./specialWord.model.js")(sequelize, Sequelize);
db.groupMember = require("./groupMember.model.js")(sequelize, Sequelize);
db.activity = require("./chatActivity.model.js")(sequelize, Sequelize);
db.activityType = require("./activityType.model.js")(sequelize, Sequelize)
db.chat = require("./Chat/chat.model.js")(sequelize, Sequelize)
db.userChatMapping = require("./Chat/userChatMapping.model.js")(sequelize, Sequelize)
db.message = require("./Chat/message.model.js")(sequelize, Sequelize)
db.activity = require("./Activity/activity.model.js")(sequelize, Sequelize)
db.activityAndUserStatusMapping = require("./Activity/activityAndUserStatusMapping.model.js")(sequelize, Sequelize)
db.userActivityTimingMapping = require("./Activity/userActivityTimingMapping.model.js")(sequelize, Sequelize)


// relation of chat with userChatMapping
db.chat.hasMany(db.userChatMapping, { as: "userChatMappings" });
db.userChatMapping.belongsTo(db.chat, {
  foreignKey: "chatId",
  as: "chat",
});


// relation of chat with message
db.chat.hasMany(db.message, { as: "messages" });
db.message.belongsTo(db.chat, {
  foreignKey: "chatId",
  as: "chat",
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;