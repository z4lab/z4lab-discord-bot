const sql = require("sqlite3");
const path = require('path')
const db  = new sql.Database(path.resolve(__dirname, "config/main.db"));

db.run(`CREATE TABLE IF NOT EXISTS \`config_bot\` (
	\`option\` CHAR NOT NULL DEFAULT "",
	\`value\` CHAR NOT NULL DEFAULT ""
);`);

db.run(`CREATE TABLE IF NOT EXISTS \`channels\` (
	\`channeltype\` INT(1) NOT NULL DEFAULT "1",
	\`channelid\` CHAR NOT NULL DEFAULT ""
);`);

db.run(`CREATE TABLE IF NOT EXISTS \`alias\` (
	\`alias\` CHAR NOT NULL DEFAULT "",
	\`command\` CHAR NOT NULL DEFAULT ""
);`);

db.run(`CREATE TABLE IF NOT EXISTS \`servers\` (
	\`name\` CHAR NOT NULL DEFAULT "",
	\`host\` CHAR NOT NULL DEFAULT "",
	\`port\` CHAR NOT NULL DEFAULT "",
	\`type\` CHAR NOT NULL DEFAULT "",
	\`rcon\` CHAR NOT NULL DEFAULT ""
);`);

db.run(`CREATE TABLE IF NOT EXISTS \`whitelist_roles\` (
	\`type\` INT(1) NOT NULL DEFAULT "",
	\`roleid\` CHAR NOT NULL DEFAULT ""
);`);

db.run(`CREATE TABLE IF NOT EXISTS \`database\` (
	\`name\` CHAR NOT NULL DEFAULT "",
	\`host\` CHAR NOT NULL DEFAULT "",
	\`user\` CHAR NOT NULL DEFAULT "",
	\`password\` CHAR NOT NULL DEFAULT "",
	\`database\` CHAR NOT NULL DEFAULT ""
);`);

setTimeout(function(){insert(db)}, 1000);
function insert(db) {
	db.run(`INSERT INTO config_bot (option,value) VALUES ("botToken", ""),("botPrefix", ""),("steamApiKey", ""),("presencePrefix","z4lab.com |"),("versionInName","true");`);
}
