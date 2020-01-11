(async() => {
    const sql = require("sqlite3");
    const path = require('path')
    const db  = new sql.Database(path.resolve(__dirname, "config/main.db"));
    const config = require(__dirname+"/config/bot.json");
    const configChannles = require(__dirname+"/config/channels.json");
    const configAlias = require(__dirname+"/config/alias.json");
    const configServers = require(__dirname+"/config/servers.json");
    const configWhitelist = require(__dirname+"/config/whitelist.json");
    const configDatabase = require(__dirname+"/config/dbs.json");
    
    var sleep = function (ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms*1000);
        });
    };
    
    db.run(`DELETE FROM alias;`);
    db.run(`DELETE FROM channels;`);
    db.run(`DELETE FROM database;`);
    db.run(`DELETE FROM servers;`);
    db.run(`DELETE FROM whitelist_roles`)
    
    await sleep(4);
    
    //Merge channels from bot.json
    
    config.channels.forEach(channel => {
        db.run(`INSERT INTO channels (channeltype, channelid) VALUES ("1", "${channel}")`);
    });
    config.adminChannels.forEach(channel => {
        db.run(`INSERT INTO channels (channeltype, channelid) VALUES ("2", "${channel}")`);
    });
    
    //Merge channels.json
    
    db.run(`INSERT INTO channels (channeltype, channelid) VALUES ("3", "${configChannles.log.channelID}")`);
    db.run(`INSERT INTO channels (channeltype, channelid) VALUES ("4", "${configChannles.memberCount.channelID}")`);
    
    //Merge bot.json
    
    db.run(`UPDATE config_bot SET value = "${config.token}" WHERE option = "botToken";`);
    db.run(`UPDATE config_bot SET value = "${config.prefix}" WHERE option = "botPrefix";`);
    db.run(`UPDATE config_bot SET value = "${config.steam["api-key"]}" WHERE option = "steamApiKey";`);
    db.run(`UPDATE config_bot SET value = "${config.presence.game.name}" WHERE option = "presencePrefix";`);
    db.run(`UPDATE config_bot SET value = "${String(config.version.inName)}" WHERE option = "versionInName";`);
    
    //Merge alias.json
    
    configAlias.alias.forEach(alias => {
        let name = alias.name;
        alias.alias.forEach(subalias => {
            db.run(`INSERT INTO alias (alias, command) VALUES ("${subalias}", "${name}");`);
        });
    });
    
    //Merge servers.json
    
    Object.keys(configServers).forEach(server => {
        db.run(`INSERT INTO \`servers\` (\`name\`, \`host\`, \`port\`, \`type\`, \`rcon\`) VALUES ("${server}","${configServers[server].host}","${configServers[server].port}","${configServers[server].type}","${configServers[server].rcon || "none"}");`)
    });
    
    //Merge whitelist.json
    
    configWhitelist.allowedIDs.add.forEach(roleid => {
        db.run(`INSERT INTO whitelist_roles (type, roleid) VALUES ("1","${roleid}");`)
    });
    
    configWhitelist.allowedIDs.remove.forEach(roleid => {
        db.run(`INSERT INTO whitelist_roles (type, roleid) VALUES ("2","${roleid}");`)
    });
    
    //Merge dbs.json
    
    Object.keys(configDatabase).forEach(server => {
        console.log(server);
        db.run(`INSERT INTO \`database\` (\`name\`, \`host\`, \`user\`, \`password\`, \`database\`) VALUES ("${server}","${configDatabase[server].host}","${configDatabase[server].user}","${configDatabase[server].password || "none"}","${configDatabase[server].database}");`)
    });
})();