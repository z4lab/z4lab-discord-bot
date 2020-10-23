const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message) {

	let embed = new RichEmbed()
		.setTitle('z4lab Community Serverlist')
		.setThumbnail(bot.user.avatarURL)
		.addField(`[KZ] z4lab Climbing/Kreedz | 128 Tick`, '`' + bot.config.main.prefix + 'kz` for connect and map information', false)
		.addField(`[ARENA] z4lab Multi 1v1 | PRIME | 128 Tick`, '`' + bot.config.main.prefix + '1v1` for connect and map information', false)
		.addField(`[SURF] z4lab Beginner Surf | EASY | 102 Tick`, '`' + bot.config.main.prefix + 'beginner` for connect and map information', false)
		.addField(`[SURF] z4lab Pro Surf | HARD | 64 Tick`, '`' + bot.config.main.prefix + 'pro` for connect and map information', false)
		.addField(`[SURF] z4lab VIP/Whitelist Surf | 102 Tick`, '`' + bot.config.main.prefix + 'vipsurf` for connect and map information', false)
		.addField(`[FFA/DM] z4lab Warmup | PRIME | D2 Only | 128 Tick`, '`' + bot.config.main.prefix + 'warmup` for connect and map information', false);
	return message.channel.send(embed);

};

module.exports.help = {
	name: "servers",
	category: "main",
	usage: false,
	description: "displays our servers and advanced server commands",
	permissionLvl: 0
};