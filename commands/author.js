const { RichEmbed } = require("discord.js");


module.exports.run = function (bot, message, args){

	let embed = new RichEmbed()
		.setTitle('z4lab Discord Bot')
		.setThumbnail(bot.user.avatarURL)
		.addField(`Main Script`, `<@235809101051985920>`, true)
		.addField(`Team Maintainer`, `<@521468077817200643>`, true)
		.addField(`GitHub Repository`, `https://github.com/totles/z4lab-discord-bot`, true);

	return message.channel.send(embed);

};

module.exports.help = {
	name: "author",
	category: "main",
	usage: false,
	description: "displays the author of this bot",
	permissionLvl: 0
};
