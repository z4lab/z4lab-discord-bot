const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args) {

	let embed = new RichEmbed()
		.setTitle('z4lab Random Commands Overview')
		.setThumbnail(bot.user.avatarURL)
		.addField(`${bot.config.main.prefix}woof`, 'displays a random doggo', false)
		.addField(`${bot.config.main.prefix}meow`, 'displays a random cat', false)
		.addField(`${bot.config.main.prefix}shiba`, 'displays a random shiba', false)
		.addField(`${bot.config.main.prefix}gs`, 'displays a random shepherd picture', false)
		.addField(`${bot.config.main.prefix}fox`, 'displays a random fox', false)
		.addField(`${bot.config.main.prefix}toothless`, 'displays a random Toothless gif', false);

	return message.channel.send(embed);

};

module.exports.help = {
	name: "random",
	category: "main",
	usage: false,
	description: "displays all random commands available",
	permissionLvl: 0
};