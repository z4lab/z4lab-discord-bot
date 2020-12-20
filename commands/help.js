const { RichEmbed } = require("discord.js");
const sql = require("../util/db/sql");
const getPermissionLvl = require("../util/permissionLvl");

function globalHelp(bot, embed, permissionLvl) {
	embed.setTitle(`z4lab Discord Bot Commands Overview @ PermLvl ${permissionLvl}`).setThumbnail(bot.user.avatarURL);
	bot.commands.forEach(command => {
		if (command.help.category && command.help.category === "main") {
			if (command.help.permissionLvl <= permissionLvl) {
				if (!command.help.usage) {
					embed.addField(`${bot.config.main.prefix}${command.help.name}`, command.help.description || "N/A", false);
				} else if (command.help.usage && command.help.usage.length == 1) {
					embed.addField(`${bot.config.main.prefix}${command.help.name} ${command.help.usage[0].command}`, command.help.description || "N/A", false);
				} else {
					embed.addField(`${bot.config.main.prefix}${command.help.name}`, command.help.description || "N/A", false);
				}
			}
		}

	});
	return embed;
}

module.exports.run = async function (bot, message, args) {

	let permissionLvl = getPermissionLvl.getUserLevel(message.member);

	let embed = new RichEmbed();

	if (args[0]) {

		let cmd = args[0];
		if (!global.bot.commands.get(cmd)) cmd = await sql.alias.check(bot, cmd);
		let command = global.bot.commands.get(cmd);

		if (command && permissionLvl >= command.help.permissionLvl) {
			embed.setTitle(`z4lab Discord Bot ${cmd} usage`).setThumbnail(bot.user.avatarURL);
			if (!command.help.usage) {
				embed.addField(`${bot.config.main.prefix}${command.help.name}`, command.help.description || "N/A", false);
			} else if (command.help.usage && command.help.usage.length == 1) {
				embed.addField(`${bot.config.main.prefix}${command.help.name} ${command.help.usage[0].command}`, command.help.description || "N/A", false);
			} else if (command.help.usage && command.help.usage.length > 1) {
				command.help.usage.forEach((subCommand) => {
					embed.addField(`${bot.config.main.prefix}${command.help.name} ${subCommand.command}`, subCommand.description || "N/A", false);
				});
			} else {
				embed.addField(`${bot.config.main.prefix}${command.help.name}`, command.help.description || "N/A", false);
			}
		} else {
			embed = globalHelp(bot, embed, permissionLvl);
		}

	} else {
		embed = globalHelp(bot, embed, permissionLvl);
	}
		
	return message.channel.send(embed);

};

module.exports.help = {
	name: "help",
	category: false,
	usage: false,
	description: false,
	permissionLvl: 0
};