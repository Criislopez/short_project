const router = require("express").Router();
const urlRoutes = require("./url");
const authRoutes = require('./auth');
const { authorizer }  = require('../middlewares');

module.exports = (db) => {
  router.use("/url", urlRoutes(db));
  router.use("/auth", authorizer,  authRoutes(db));
  
  return router;
}