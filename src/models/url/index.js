const { ErrorsIndex } = require("../../misc/errors");
const { inserUrls, selectUrl } = require("./queries");

const saveUrls = (db) => async (origin, destination) => {

    try {
        const connection = await db;
        await connection.query(inserUrls(origin, destination))
        return {
            ok:true,
        }
    } catch (error) {
        console.log("> [ERROR saveUrls]: ", error.message);
        return {
            ok: false,
            errorType: ErrorsIndex.API_ERROR,
        }
    }
}

const getOrigin = (db) => async (id) => {
    try {
        const connection = await db;
        const origin = await connection.maybeOneFirst(selectUrl(id));

        if(!origin) throw Error("No origin related found")

        return {
            ok:true,
            content: {
                url:origin,
            }
        }
    } catch (error) {
        console.log("> [ERROR getOrigin]: ", error.message);
        return {
            ok: false,
            errorType: ErrorsIndex.API_ERROR,
        };
    }
};

module.exports = {
    saveUrls,
    getOrigin,
}