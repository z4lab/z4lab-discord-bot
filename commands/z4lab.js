const { RichEmbed } = require("discord.js");


module.exports.run = function (bot, message) {

	let embed = new RichEmbed()
		.setTitle('z4lab Community Links')
		.setThumbnail(bot.user.avatarURL)
		.addField('Homepage', '<https://z4lab.com>  ', true)
		.addField('Steam Group', '<https://z4lab.com/group/>', true)
		.addField('SourceBans', '<https://bans.z4lab.com>', true)
		.addField('Changelog', '<https://z4lab.com/log/>', true)
		.addField('Arena Stats', '<https://z4lab.com/arena/>', true)
		.addField('Staff appliaction', '<https://z4lab.com/staff/>', true)
		.addField('TeamSpeak', 'ts.z4lab.com', true);

	return message.channel.send(embed);

};

module.exports.help = {
	name: "z4lab",
	category: "main",
	usage: false,
	description: "displays our community links",
	permissionLvl: 0
};