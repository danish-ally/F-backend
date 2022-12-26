module.exports = app => {
    const profile = require('../controllers/index.controller').profile;
    const router = require("express").Router();
    router.post("/", profile.add);
    router.get("/", profile.list);
    router.delete("/:id", profile.delete);
    app.use('/api/profile', router);
}