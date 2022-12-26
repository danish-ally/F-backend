module.exports = app => {
    const login = require('../controllers/index.controller').login;
    const router = require("express").Router();
    router.get("/", login.list);
    router.get("/:id", login.getById);
    router.post("/", login.add);
    router.put("/:id", login.update);
    router.delete("/:id", login.delete);
    app.use('/api/login', router);
}