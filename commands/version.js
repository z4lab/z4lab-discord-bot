const { RichEmbed, version } = require("discord.js");

module.exports.run = async (bot, message) => {

	let embed = new RichEmbed()
		.setTitle('z4lab Discord Bot')
		.setThumbnail(bot.user.avatarURL)
		.addField(`Client Version`, `v${bot.config.main.version.version}`, true)
		.addField(`Client Build`, bot.config.main.version.build, true)
		.addField(`DiscordJS Version`, `v${version}`, true)
		.addField(`NodeJS Version`, `${process.version}`, true);

	return message.channel.send(embed);

};

module.exports.help = {
	name: "version",
	category: "main",
	usage: false,
	description: "displays the current versions of this bot",
	permissionLvl: 0
};