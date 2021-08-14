module.exports = (name, config) => {
	const Bot = require(process.cwd());

	try {
		config = JSON.parse(config);
	} catch (e) {
		return Bot.Logger.error("MariaDB", "Failed to parse config DB connection [%s]", name);
	}

	try {
		Bot.DB.MariaDB[name] = require("mariadb").createConnection(config);
	} catch (e) {
		return Bot.Logger.error("MariaDB", "Failed to create DB connection [%s]", name);
	}

	Bot.Logger.info("MariaDB", "Created DB connection [%s]", name);

}