const router = require('express').Router();
const { register, login, logout } = require('../controllers/auth');

module.exports = (db) => {
    router.post("/register", register(db));
    router.post("/login", login(db));
    router.post("/logout", logout(db));
    return router;
}