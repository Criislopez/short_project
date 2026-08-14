const { ErrorsIndex } = require('../../misc/errors');
const { insertUser, selectUser } = require('./queries');

const saveUser = (db) => async (name, email, password) => {
    try {
        const connection = await db;
        await db.query(insertUser(name, email, password));

        return {
            ok:true,
        };
    } catch (error) {
        console.log("> [ERROR saveUser]: ", error.message);
        return {
            ok: false,
            errorType: ErrorsIndex.API_ERROR,
        };
    }
};

const getUser = (db) => async (email, compareFn) => {
    try {
        const connection = await db;
        
        const user = await connection.maybeOne(selectUser(email));

        if(!user || !(await compareFn(user.password))) {
            return {
                ok: false, 
                errorType: ErrorsIndex.BAD_INFO,
            }
        }

        const { name} = user;

        return {
            ok:true,
            content : {
                user: { name, email },
            }
        };

    } catch (error) {
        console.log("> [ERROR saveUser]: ", error.message);
        return {
            ok: false,
            errorType: ErrorsIndex.API_ERROR,
        };
    }
};


module.exports = {
    saveUser,
    getUser,
}