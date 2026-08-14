const router = require('express').Router();
const controllers = require('../controllers/url')

module.exports = (db) => {
    router.get("/info", controllers.getInfo(db));
    router.post("/hello", controllers.postHello(db));
    return router;
}
