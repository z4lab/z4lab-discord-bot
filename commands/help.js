const { RichEmbed } = require("discord.js");
const getPermissionLvl = require("../util/permissionLvl");

module.exports.run = function (bot, message, args, prefix) {

    let permissionLvl = getPermissionLvl(message.member);

    let embed = new RichEmbed()
        .setTitle(`z4lab Discord Bot Commands Overview @ PermLvl ${permissionLvl}`)
        .setThumbnail(bot.user.avatarURL);

    bot.commands.forEach(command => {
        if (command.help.category && command.help.category === "main") {
            if (command.help.permissionLvl <= permissionLvl) {
                if (!command.help.usage) {
                    embed.addField(`${prefix}${command.help.name}`, command.help.description || "N/A", false);
                } else if (command.help.usage && command.help.usage.length == 1) {
                    embed.addField(`${prefix}${command.help.name} ${command.help.usage[0].command}`, command.help.description || "N/A", false);
                } else {
                    embed.addField(`${prefix}${command.help.name}`, command.help.description || "N/A", false);
                }
            }
        }

    });

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help",
    category: false,
    usage: false,
    description: false,
    permissionLvl: 0
};