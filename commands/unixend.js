const { RichEmbed } = require("discord.js");
const toDuration = require('humanize-duration');

module.exports.run = function (bot, message, args){

	let time = Math.floor(2147483647 - Math.floor((message.createdAt / 1000))) * 1000;

	duration = toDuration(time);

	let embed = new RichEmbed()
		.setTitle('days until Unixtime overflow')
		.setThumbnail(bot.user.avatarURL)
		.setDescription(String(duration))
		.addField('more information','https://en.wikipedia.org/wiki/Year_2038_problem', true);

	return message.channel.send(embed);

};

module.exports.help = {
	name: "unixend",
	category: "main",
	usage: false,
	description: "cuntdown to the worlds end",
	permissionLvl: 0
};
