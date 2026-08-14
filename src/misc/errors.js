const ErrorsIndex = {
    INFO_NEEDED: "infoNeeded",
    BAD_INFO: "badInfo",
    NOT_FOUND: "notFound",
    UNAUTHORIZE: "unauthorize",
    API_ERROR: "apiError",
}

const errorsCatalog = {
    infoNeeded: {
        statusCode: 400,
        error: new Error ("No info provided"),
    },

    badInfo: {
        statusCode: 400,
        error: new Error("Wrong email or password"),
    },

    notFound: {
        statusCode: 404,
        error: new Error("resource not found"),
    },

    unauthorize: {
        statusCode: 401,
        error: new Error("unauthorize"),
    },

    apiError: {
        statusCode: 500,
        error: new Error("ups, something went wrong"),
    },
}

const getError = (index) => {
    return errorsCatalog[index ?? ErrorsIndex.API_ERROR];
}

module.exports = {
    ErrorsIndex,
    errorsCatalog,
    getError,
}