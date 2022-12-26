module.exports = app => {
    const activity = require("../../controllers/Activity/activity.controller");
    var router = require("express").Router();
    // Create a new Activity
    router.post("/", activity.create);
    //Get Activity By ActivityId
    router.get("/:id", activity.getByActivityId);
    // Update Activity
    router.put("/:id", activity.update)
    // get All Activity
    router.get("/user/:userId", activity.getAll)
    // Set Started Time of activity by user
    router.post("/:activityId/user/:userId", activity.setStartedTime)
    // Set Ended Time of activity by user
    router.put("/:activityId/user/:userId", activity.setEndedTime)


    app.use('/api/activity', router);


};