module.exports = (name, config) => {
	const Bot = require(process.cwd());

	Bot.DB.MariaDB[name] = require("mariadb").createConnection(config);
	Bot.Logger.info("MariaDB", "Created DB connection [%s]", name);

}