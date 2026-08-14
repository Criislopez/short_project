const { getError, ErrorsIndex } = require('../../misc/errors');
const { getUser } = require('../../models/auth');
const { create } = require('../../utils/cookie');
const { compare } = require('../../utils/hash');
const { sign } = require('../../utils/jwt');

module.exports = (db) => async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(getError(ErrorsIndex.INFO_NEEDED));
    }
    
    const response = await getUser(db)(email, compare(password));
    
    if(!response.ok) return next(getError(response.errorType));

    serialize(res)(response.content.user);

    res.status(200).json({
        success: true,
        data: {
            user: response.content.user.name,
        }
    });
};