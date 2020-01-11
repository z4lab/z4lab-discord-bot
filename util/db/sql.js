const sql = {};

const timestamp = require("../timeStamp");
const db = new bot.modules.core.sqlite3.Database(bot.modules.file.path.resolve(__dirname, "../../config/main.db"));

sql.loadSettings = function (bot, channel = false, answer = false) {
    let setPresence = require(bot.modules.file.path.resolve(__dirname, "../presence"));

    db.all("SELECT * FROM config_bot", [], (err, rows) => {
        if (err) return err;
        global.bot.config.main.token = rows[0].value || bot.config.main.token;
        global.bot.config.main.prefix = rows[1].value || bot.config.main.prefix;
        global.bot.config.main.steam["api-key"] = rows[2].value || bot.config.main.steam["api-key"];
        global.bot.config.main.presence.game.name = rows[3].value || bot.config.main.presence.game.name;
        global.bot.config.main.version.inName = Boolean(rows[4].value);
        global.bot.config.main.version.version = require(bot.modules.file.path.resolve(__dirname, "../../package.json")).version;
        setPresence(global.bot);
        console.log(timestamp() + "[SQLite] Bot config loaded!");
        if (channel && answer) answer.edit(answer.content + "\n```md\n[SQLite] 1/5 - Bot config loaded! ]:```");
    });

    db.all("SELECT * FROM channels", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        global.bot.config.main.channels = [];
        global.bot.config.main.adminChannels = [];
        rows.forEach(row => {
            if (row.channeltype === 1) global.bot.config.main.channels.push(row.channelid);
            if (row.channeltype === 2) global.bot.config.main.adminChannels.push(row.channelid);
            if (row.channeltype === 3) global.bot.config.channels.log.channelID = row.channelid;
            if (row.channeltype === 4) global.bot.config.channels.memberCount.channelID = row.channelid;
        });
        console.log(timestamp() + "[SQLite] Channel config loaded!");
        if (channel && answer) answer.edit(answer.content + "\n```md\n[SQLite] 2/5 - Channel config loaded! ]:```");
    });

    db.all("SELECT * FROM whitelist_roles", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        if (!global.bot.config.whitelist.allowedIDs) global.bot.config.whitelist.allowedIDs = {};
        global.bot.config.whitelist.allowedIDs.add = [];
        global.bot.config.whitelist.allowedIDs.remove = [];
        rows.forEach(row => {
            if (row.type === 1) global.bot.config.whitelist.allowedIDs.add.push(row.roleid);
            if (row.type === 2) global.bot.config.whitelist.allowedIDs.remove.push(row.roleid);
        });
        console.log(timestamp() + "[SQLite] Role config loaded!");
        if (channel && answer) answer.edit(answer.content + "\n```md\n[SQLite] 3/5 - Role config loaded! ]:```");
    });

    db.all("SELECT * FROM servers", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        rows.forEach(row => {
            global.bot.config.servers[row.name].host = row.host;
            global.bot.config.servers[row.name].port = row.port;
            global.bot.config.servers[row.name].type = row.type;
            global.bot.config.servers[row.name].rcon = row.rcon;
        });
        console.log(timestamp() + "[SQLite] Server config loaded!");
        if (channel && answer) answer.edit(answer.content + "\n```md\n[SQLite] 4/5 - Server config loaded! ]:```");
    });

    db.all("SELECT * FROM database", [], (err, rows) => {
        if (err) return err;
        if (rows.length <= 0) return 0;
        rows.forEach(row => {
            global.bot.config.dbs[row.name].host = row.host;
            global.bot.config.dbs[row.name].user = row.user;
            global.bot.config.dbs[row.name].password = row.password;
            global.bot.config.dbs[row.name].database = row.database;
        });
        console.log(timestamp() + "[SQLite] Database config loaded!");
        if (channel && answer) answer.edit(answer.content + "\n```md\n[SQLite] 5/5 - Database config loaded! ]:```").then(message=>{message.channel.send("```md\n[SQLite] Bot successfully reloaded! ]:```");});

        let mysql = require("mysql");
        global.bot.db = {};
        global.bot.db.db_beginner = mysql.createConnection(global.bot.config.dbs.beginner);
        global.bot.db.db_pro = mysql.createConnection(global.bot.config.dbs.pro);
        global.bot.db.db_arena = mysql.createConnection(global.bot.config.dbs.arena);
        global.bot.db.db_whitelist = mysql.createConnection(global.bot.config.dbs.whitelist);
    });
};

sql.alias = {};

sql.alias.check = async function(bot, word) {
    var alias = word;
    db.all(`SELECT * FROM alias WHERE alias = "${alias}"`, [], (err, rows) => {
        if (err) return;
        if (rows.length === 0) return;
        if (alias == "alias") return;
        alias = rows[0].command;
    });
    await global.bot.sleep(0.5);
    return alias;
};


sql.alias.insert = async function(bot, command, alias) {

    if (command === alias) return ["```md\n[Error] Can't bind command to command! ]:```", true];
    
    var check = await sql.alias.check(global.bot, alias)
    var check2 = await sql.alias.check(global.bot, command);

    console.log(command);
    console.log(check2);
    
    if (check === command) return ["```md\n[Error] This bind is already existing! ]:```", true];
    if (check !== alias) return ["```md\n[Error] Bind already in use by < "+check+" >! ]:```", true];
    if (!global.bot.commands.get(command) && !global.bot.commands.get(check2)) return ["```md\n[Error] Given command is non existant! ]:```", true];
    if (!global.bot.commands.get(command)) return ["```md\n[Error] Given command is non existant! Do you mean < "+check2+" >? ]:```", true];

    db.run(`INSERT INTO alias (alias, command) VALUES ("${alias}", "${command}");`, (err) => {
        if (err) throw err;
    });

    await global.bot.sleep(0.5);

    return ["```md\n[Alias] Bind successfully created from < "+alias+" > to < "+command+" > ]:```"];

};

sql.alias.delete = async function(bot, alias) {
    
    var check = await sql.alias.check(global.bot, alias);
    var error = false;

    if (check === alias) return ["```md\n[Error] This bind is non-existent! ]:```", true];

    db.run(`DELETE FROM alias WHERE alias = "${alias}";`, (err) => {
        if (err) {
            error = true;
            throw err;                        
        } 
    });

    await global.bot.sleep(0.5);

    if (error) return ["```md\n[Error] Failed to delete bind! ]:```", true];

    return ["```md\n[Alias] Bind between < "+alias+" > and < "+check+" > successfully deleted! ]:```"];
    
};

sql.alias.rename = async function(bot, oldAlias, newAlias) {

    if (oldAlias === newAlias) return ["```md\n[Error] New name can't be old name! ]:```", true];

    var oldCheck = await sql.alias.check(global.bot, oldAlias);
    var newCheck = await sql.alias.check(global.bot, newAlias);
    var error = false;

    if (oldCheck === oldAlias) return ["```md\n[Error] This bind is non-existent! ]:```", true];
    if (newCheck != newAlias || global.bot.commands.get(newAlias)) return ["```md\n[Error] New name is already in use! ]:```", true];

    db.run(`UPDATE alias SET alias = "${newAlias}" WHERE alias = "${oldAlias}";`);

    await global.bot.sleep(0.5);

    return ["```md\n[Alias] Name of < "+oldAlias+" > successfully changed to < "+newAlias+" >! ]:```"];

};

sql.prefix = {};

sql.prefix.change = async function(bot, newPrefix) {

    var oldPrefix = global.bot.config.main.prefix;

    if (oldPrefix === newPrefix) return ["```md\n[Error] New prefix can't be old prefix! ]:```", true];

    var prefixMaxLength = 2; // move to config == db!
    if (prefixMaxLength <= 0 || prefixMaxLength >= 10) prefixMaxLength = 2; // forcing to 1 digit length
    var s = "";
    if (prefixMaxLength != 1) s = "s";

    if (newPrefix.length > prefixMaxLength) return [`\`\`\`md\n[Error] Prefix shouldn't be longer then < ${prefixMaxLength} > character${s}! ]:\`\`\``, true];

    db.run(`UPDATE config_bot SET value = "${newPrefix}" WHERE option = "botPrefix";`);

    return ["```md\n[Prefix] Prefix successfully changed from < "+oldPrefix+" > to < "+newPrefix+" >! ]:```"];

};

module.exports = sql;