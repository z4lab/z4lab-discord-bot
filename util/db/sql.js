const sql = {};
const sqlite = require("sqlite3");
const timestamp = require("../timeStamp");
const path = require('path')
const db = new sqlite.Database(path.resolve(__dirname, "../../config/main.db"));

sql.loadSettings = function (bot) {
    let setPresence = require(path.resolve(__dirname, "../presence"));

    db.all("SELECT * FROM config_bot", [], (err, rows) => {
        if (err) return err;
        bot.config.main.token = rows[0].value || bot.config.main.token;
        bot.config.main.prefix = rows[1].value || bot.config.main.prefix;
        bot.config.main.steam["api-key"] = rows[2].value || bot.config.main.steam["api-key"];
        bot.config.main.presence.game.name = rows[3].value || bot.config.main.presence.game.name;
        bot.config.main.version.inName = Boolean(rows[4].value);
        bot.config.main.version.version = require(path.resolve(__dirname, "../../package.json")).version;
        setPresence(bot);
        console.log(timestamp() + "[SQLite] Bot config loaded!");
    });

    db.all("SELECT * FROM channels", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        bot.config.main.channels = [];
        bot.config.main.adminChannels = [];
        rows.forEach(row => {
            if (row.channeltype === 1) bot.config.main.channels.push(row.channelid);
            if (row.channeltype === 2) bot.config.main.adminChannels.push(row.channelid);
            if (row.channeltype === 3) bot.config.channels.log.channelID = row.channelid;
            if (row.channeltype === 4) bot.config.channels.memberCount.channelID = row.channelid;
        });
        console.log(timestamp() + "[SQLite] Channel config loaded!");
    });

    db.all("SELECT * FROM whitelist_roles", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        if (!bot.config.whitelist.allowedIDs) bot.config.whitelist.allowedIDs = {};
        bot.config.whitelist.allowedIDs.add = [];
        bot.config.whitelist.allowedIDs.remove = [];
        rows.forEach(row => {
            if (row.type === 1) bot.config.whitelist.allowedIDs.add.push(row.roleid);
            if (row.type === 2) bot.config.whitelist.allowedIDs.remove.push(row.roleid);
        });
        console.log(timestamp() + "[SQLite] Role config loaded!");
    });

    db.all("SELECT * FROM servers", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        rows.forEach(row => {
            bot.config.servers[row.name].host = row.host;
            bot.config.servers[row.name].port = row.port;
            bot.config.servers[row.name].type = row.type;
            bot.config.servers[row.name].rcon = row.rcon;
        });
        console.log(timestamp() + "[SQLite] Server config loaded!");
    });

    db.all("SELECT * FROM database", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        rows.forEach(row => {
            bot.config.dbs[row.name].host = row.host;
            bot.config.dbs[row.name].user = row.user;
            bot.config.dbs[row.name].password = row.password;
            bot.config.dbs[row.name].database = row.database;
        });
        console.log(timestamp() + "[SQLite] Database config loaded!");

        let mysql = require("mysql");
        bot.db = {};
        bot.db.db_beginner = mysql.createConnection(bot.config.dbs.beginner);
        bot.db.db_pro = mysql.createConnection(bot.config.dbs.pro);
        bot.db.db_arena = mysql.createConnection(bot.config.dbs.arena);
        bot.db.db_whitelist = mysql.createConnection(bot.config.dbs.whitelist);
    });
};

sql.checkAlias = async function(bot, word) {
    var alias = word;
    db.all(`SELECT * FROM alias WHERE alias = "${alias}"`, [], (err, rows) => {
        if (err) return;
        if (rows.length === 0) return;
        alias = rows[0].command;
    });
    await bot.sleep(0.5);
    return alias;
};

module.exports = sql;