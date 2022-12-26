module.exports = app => {
    const produce = require('../controllers/index.controller').produce;
    const router = require("express").Router();
    router.get("/", produce.list);
    router.post("/", produce.add);
    app.use('/api/produce', router);
}