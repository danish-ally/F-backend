module.exports = app => {
    const home = require('../controllers/index.controller').home;
    const router = require("express").Router();
    router.post("/", home.add);
    router.get("/", home.list);
    router.delete("/:id", home.delete);
    app.use('/api/home', router);
}