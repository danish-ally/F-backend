module.exports = app => {
    const activityAndUserStatusMapping = require("../../controllers/Activity/activityAndUserStatusMapping.controller");
    var router = require("express").Router();
    // update status
    router.put("/activity/:activityId/user/:userId", activityAndUserStatusMapping.updateStatus);


    app.use('/api/activityAndUserStatus', router);


};