var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dayjs = require('dayjs');
const fs = require('fs');

const routerApi = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routerApi);

app.use((req, res, next) => {
    const currentDate = dayjs().format('DD-MM-YYYY HH:mm');
    const line = `[${currentDate}] Método: ${req.method}. Url: ${req.url}\n`;
    fs.appendFile('./main.log', line, (err) => {
        next();
    });
});

module.exports = app;
