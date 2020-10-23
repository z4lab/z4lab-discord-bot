const dbRequest = require('../util/dbRequest');

module.exports.run = async function (bot, message, args) {

	if (!args[0]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + bot.config.main.prefix + 'profile [Name] ]:```');
	var name = args[0];
	if (!args[1]) args[1] = 'beginner';
	if (args[1] != 'pro') args[1] = 'beginner';
	var result;
	if (args[1] === 'beginner') {
		result = await dbRequest.getProfile(name, args[1], bot.db.db_beginner);
		if (!result.error.print) return message.channel.send(result.embed);
		return message.channel.send(result.error.name);
	} else {
		result = await dbRequest.getProfile(name, args[1], bot.db.db_pro);
		if (!result.error.print) return message.channel.send(result.embed);
		return message.channel.send(result.error.name);
	}

};

module.exports.help = {
	name: "profile",
	category: "main",
	usage: [{
		command: "[username] [BEGINNER/pro]",
		description: "displays user stats on given server"
	}],
	description: "displays user stats on given server",
	permissionLvl: 0
};