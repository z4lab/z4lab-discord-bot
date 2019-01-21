const mysql = require('mysql');
const colors = require('colors/safe');
const timestamp = require('./timeStamp');

const dbs = require('../config/dbs.json');
const db_config_beginner = dbs.beginner;
const db_config_pro = dbs.pro;
const db_config_arena = dbs.arena;

var db_beginner;

function db_beginnerErrorHandler() {
    db_beginner = mysql.createConnection(db_config_beginner);


    db_beginner.connect(function (err) {
        if (err) {
            console.log(timestamp() + '[DB Beginner] error when connecting:', err);
            setTimeout(db_beginnerErrorHandler, 2000);
        } else {
            console.log(timestamp() + colors.green('[db_beginner] Connected!'));
        }
    });

    db_beginner.on('error', function (err) {
        console.log(timestamp() + '[DB Beginner] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_beginnerErrorHandler();
        } else {
            throw err;
        }
    });
}
db_beginnerErrorHandler();

var db_pro;

function db_proErrorHandler() {
    db_pro = mysql.createConnection(db_config_pro);


    db_pro.connect(function (err) {
        if (err) {
            console.log(timestamp() + '[DB Pro] error when connecting:', err);
            setTimeout(db_proErrorHandler, 2000);
        } else {
            console.log(timestamp() + colors.green('[db_pro] Connected!'));
        }
    });

    db_pro.on('error', function (err) {
        console.log(timestamp() + '[DB Pro] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_proErrorHandler();
        } else {
            throw err;
        }
    });
}
db_proErrorHandler();

var db_arena;

function db_arenaErrorHandler() {
    db_arena = mysql.createConnection(db_config_arena);


    db_arena.connect(function (err) {
        if (err) {
            console.log(timestamp() + '[DB Arena] error when connecting:', err);
            setTimeout(db_arenaErrorHandler, 2000);
        } else {
            console.log(timestamp() + colors.green('[db_arena] Connected!'));
        }
    });

    db_arena.on('error', function (err) {
        console.log(timestamp() + '[DB Arena] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_arenaErrorHandler();
        } else {
            throw err;
        }
    });
}
db_arenaErrorHandler();


Object.assign(module.exports, {
    db_arena,
    db_beginner,
    db_pro,
});
