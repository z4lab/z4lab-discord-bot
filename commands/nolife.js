const dbRequest = require('../util/dbRequest');

module.exports.run = async function (bot, message, args) {

	if (!args[0]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + bot.config.main.prefix + 'nolife [Name] ]:```');
	let name = args[0];

	var result = await dbRequest.getPlaytime(name, bot.db.db_beginner, bot.db.db_pro);

	if (result.error.print) return message.channel.send(result.error.name);
	if (result.embed) return message.channel.send(result.embed);
	return message.channel.send('```md\n[Error] An unknown error occurred, try again later! ]:```');

};

module.exports.help = {
	name: "nolife",
	category: "main",
	usage: [{
		command: "[username]",
		description: "displays a users playtime on our surf servers"
	}],
	description: "displays a users playtime on our surf servers",
	permissionLvl: 0
};