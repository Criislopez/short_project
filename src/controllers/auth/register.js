const { saveUser } = require('../../models/auth');
const { encrypt } = require('../../utils');
const { getError } = require('../../misc/errors')

module.exports = () => async (req, res, next) =>{

    const { name, email, password } = req.body;

    await saveUser(db)(name, email, await encrypt(password));

    const response = await saveUser(db)(name, email, encrypt(password));

    if(!response.ok) return next(getError(response.errorType)); 

    res.status(200).json({
        succes: true,
    })
}