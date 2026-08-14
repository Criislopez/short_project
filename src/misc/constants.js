const { isSecure } = require("../utils");

const DB_URL = process.env.DB_URL;

const PORT = process.env.PORT;

const API_URL = process.env.API_URL;

const JWT_SECRET = process.env.JWT_SECRET;


const DEFAULT_COOKIE_NAME = "access_token";
const DEFAULT_EXP_TIME = 3_600_000;

module.exports = {
    DB_URL,
    PORT,
    API_URL: isSecure(API_URL) ? API_URL : `${API_URL}:${PORT}`,
    JWT_SECRET,
    DEFAULT_COOKIE_NAME,
    DEFAULT_EXP_TIME,
};