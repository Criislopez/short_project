const router = require('express').Router();
const { createToken,redirect } = require('../controllers/url')

module.exports = (db) => {
    router.post("/generate", createToken(db));
    router.get("/:id", redirect(db));
    return router;
}