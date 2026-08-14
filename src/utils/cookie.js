const { DEFAULT_COOKIE_NAME, DEFAULT_EXP_TIME, API_URL } = require("../misc/constants");
const { isSecure } = require(".");

const create = (res) => (token, name = DEFAULT_COOKIE_NAME, exp = DEFAULT_EXP_TIME)=> {
    res.cookie(name, token, {
        expires: new Date(Date.now() + exp),
        httpOnly: true,
        secure: isSecure(API_URL), //al hacer el https, http -> true
    })
}

const destroy = (res, name = DEFAULT_COOKIE_NAME) => {
    res.clearCookie(name);
}

module.exports = {
    create,
    destroy,
}