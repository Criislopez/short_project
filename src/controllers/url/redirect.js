const { response } = require("express");
const { getOrigin } = require("../../models/url");

module.exports = (db) => async (req, res, next) => {
    const { id } = req.params;

    const response = await getOrigin(db)(id);

    if(!response.ok) return next(getError(response.errorType));

    res.redirect(200, response.content.url);

}