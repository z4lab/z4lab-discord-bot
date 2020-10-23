const { RichEmbed } = require('discord.js');
const dbRequest = require('../util/dbRequest');


module.exports.run = async function (bot, message, args) {

	if (!args[0]) {
		let embed = new RichEmbed()
			.setTitle('z4lab Discord Bot mtop usage')
			.setThumbnail(global.bot.user.avatarURL)
			.addField(`${global.bot.config.main.prefix}mtop [mapname] [BEGINNER/pro]`, '└ Shows maprecord for the given server', false)
			.addField(`${global.bot.config.main.prefix}mtop [mapname] [username] [BEGINNER/pro]`, '└ Shows playerrecord for the given user/server', false);
		return message.channel.send(embed);
	}
	if (!args[0].toLowerCase().startsWith('surf_') || args[0].length < 6) return message.channel.send('```md\n[Error] Invalid map entered! ]:```');
	let map = args[0];
	var record = false;
	var username = null;
	var name = 'AND 1=1';
	if (args[1] && args[1].toLowerCase() != 'pro' && args[1].toLowerCase() != 'beginner') {
		name = "AND name LIKE '%" + String(args[1]) + "%'";
		username = String(args[1]);
	}
	if (args[1] == 'pro') args[2] = 'pro';
	if (!args[2]) args[2] = 'beginner';
	if (args[2] != 'pro') args[2] = 'beginner';
	if (name == 'AND 1=1') record = true;
	var mysql = global.bot.db.db_beginner;
	if (args[2] != 'beginner') mysql = global.bot.db.db_pro;
	var result = await dbRequest.getMaptime(username, record, map, args[2], mysql);
	if (result.error.print) return message.channel.send(result.error.name);
	return message.channel.send(result.runtime);
};

module.exports.help = {
	name: "mtop",
	category: "main",
	usage: [{
		command: "[mapname] [BEGINNER/pro]",
		description: "Shows maprecord for the given map/server"
	}, {
		command: "[mapname] [username] [BEGINNER/pro]",
		description: "Shows playerrecord for the given map/user/server"
	}],
	description: "shows current map/player record for given map",
	permissionLvl: 0
};