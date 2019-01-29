const mysql = require('mysql');
const colors = require('colors/safe');
const timestamp = require('./timeStamp');

const dbs = require('../config/dbs.json');
const db_config_beginner = dbs.beginner;
const db_config_pro = dbs.pro;
const db_config_arena = dbs.arena;
const db_config_whitelist = dbs.whitelist;

var db_beginner;

function db_beginnerErrorHandler() {
    db_beginner = mysql.createConnection(db_config_beginner);


    db_beginner.connect(function (err) {
        if (err) {
            console.log(timestamp() + '[DB Beginner] error when connecting:', err);
            setTimeout(db_beginnerErrorHandler, 2000);
        } else {
            console.log(timestamp() + colors.green('[db_beginner] Connected!'));
            var db_beginner_pinger = require('db-keep-alive').create_pinger(db_beginner, 60, 'SELECT 1');
            db_beginner_pinger.start();
        }
    });

    db_beginner.on('error', function (err) {
        console.log(timestamp() + '[DB Beginner] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_beginner_pinger.stop();
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
            var db_pro_pinger = require('db-keep-alive').create_pinger(db_pro, 60, 'SELECT 1');
            db_pro_pinger.start();
        }
    });

    db_pro.on('error', function (err) {
        console.log(timestamp() + '[DB Pro] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_pro_pinger.stop();
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
            var db_arena_pinger = require('db-keep-alive').create_pinger(db_arena, 60, 'SELECT 1');
            db_arena_pinger.start();
        }
    });

    db_arena.on('error', function (err) {
        console.log(timestamp() + '[DB Arena] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_arena_pinger.stop();
            db_arenaErrorHandler();
        } else {
            throw err;
        }
    });
}
db_arenaErrorHandler();

var db_whitelist;

function db_whitlistErrorHandler() {
    db_whitelist = mysql.createConnection(db_config_whitelist);


    db_whitelist.connect(function (err) {
        if (err) {
            console.log(timestamp() + '[DB Whitelist] error when connecting:', err);
            setTimeout(db_whitlistErrorHandler, 2000);
        } else {
            console.log(timestamp() + colors.green('[db_whitelist] Connected!'));
            var db_whitelist_pinger = require('db-keep-alive').create_pinger(db_whitelist, 60, 'SELECT 1');
            db_whitelist_pinger.start();
        }
    });

    db_whitelist.on('error', function (err) {
        console.log(timestamp() + '[DB Whitelist] db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            db_whitelist_pinger.stop();
            db_whitlistErrorHandler();
        } else {
            throw err;
        }
    });
}
db_whitlistErrorHandler();


Object.assign(module.exports, {
    db_arena,
    db_beginner,
    db_pro,
    db_whitelist
});
