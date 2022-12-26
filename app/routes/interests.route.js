module.exports = app => {
    const interest = require('../controllers/index.controller').interest;
    const router = require("express").Router();
    router.get("/", interest.list);
    router.post("/", interest.add);
    app.use('/api/interest', router);
}