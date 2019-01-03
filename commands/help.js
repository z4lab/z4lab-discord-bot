const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix){

    let embed = new RichEmbed()
        .setTitle('z4lab-Bot Commands :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}servers`, '⬛ Displays our servers and advanced server commands', false)
        .addField(`${prefix}arena`, '⬛ Displays advanced arena commands', false)
        .addField(`${prefix}mtop [map] {username} {server(pro/beginner)} `, '⬛ Shows current map/player records', false)
        .addField(`${prefix}btop [bonusnumber] [map]`, '⬛ Shows current bonus record', false)
        .addField(`${prefix}profile [username] {server(pro/beginner)}`, '⬛ Shows user stats', false)
        .addField(`${prefix}author`, '⬛ Displays the authors of the bot', false)
        .addField(`${prefix}version`, '⬛ Displays the current bot version', false)
        .addField(`${prefix}unixend`, '⬛ Displays time till end of the world', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};
