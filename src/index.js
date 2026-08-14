const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT } = require("./misc/constants");
const db = require('./config/db');
const routes = require('./routes');
const { getError, ErrorsIndex } = require('./misc/errors');
const exception = require('./middlewares/exception');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(routes(db));

app.use((req, res, next) => {
    next(
        {
            statusCode: 404,
            error: new Error("resouce not found")
        }
    );
})

app.use(exception, ({ statusCode, error }, req, res, next) => {
    console.log("> error: ", error.message);
    res.status(400).json({
        succes: false,
        message: "",
    });
});

app.listen(API_PORT, () =>{
    console.log(`> [:${PORT}] Server listening`);
})