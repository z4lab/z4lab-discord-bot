module.exports.run = async (bot, message, args) => {

	let sql = require("../util/db/sql");
	let result;

	if (!args || args.length === 0) return;

	if ((args[0] === "add" || args[0] === "create") && args.length >= 3) result = await sql.alias.insert(bot, args[1], args[2]);
	else if ((args[0] === "remove" || args[0] === "rm") && args.length >= 2) result = await sql.alias.delete(bot, args[1]);
	else if ((args[0] === "rename" || args[0] === "rn") && args.length >= 3) result = await sql.alias.rename(bot, args[1], args[2]);
	else return;
	
	message.channel.send(result[0]);

	if (!result[1]) sql.loadSettings(bot);

};

module.exports.help = {
	name: "alias",
	category: "main",
	usage: [{
		command: "add/create [command] [alias]",
		description: "create an alias for a given command"
	},{
		command: "rm/remove [alias]",
		description: "remove an existing alias"
	},{
		command: "rn/rename [old name] [new name]",
		description: "rename an existing alias"
	}],
	description: "add/rename/delete alias",
	permissionLvl: 3
};