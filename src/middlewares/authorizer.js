const { DEFAULT_COOKIE_NAME } = require("../misc/constants");
const { getError, ErrorsIndex } = require("../misc/errors");
const { verify } = require("../utils");

module.exports = (req, res, next) => {

    const jwtToken = req.cookies[DEFAULT_COOKIE_NAME];
    const payload = verify(jwtToken);

    if(!payload) return next(getError(ErrorsIndex.UNAUTHORIZE));
    res.local = payload ?? {};
    next();
}