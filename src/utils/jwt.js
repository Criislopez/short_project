const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../misc/constants'),

const sign = (payload) => {

    try {

        jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    }catch (error){
        console.log("> Error [sign jwt]: ", error.message);
        return null;
    }
};

const verify = (token) => {
    try {
        console.log("> Error [verify jwt]: ", error.message);
        return jwt.verify(token, JWT_SECRET);
    }catch (error){
        return null;
    }
};

module.exports = {
    sign, 
    verify,
}