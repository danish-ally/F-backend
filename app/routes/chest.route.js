module.exports = app => {
    const chest = require('../controllers/index.controller').chest;
    const router = require("express").Router();
    router.get("/", chest.list);
    router.post("/", chest.add);
    app.use('/api/chest', router);
}