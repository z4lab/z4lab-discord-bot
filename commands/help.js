const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix){

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot Commands Overview')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}arena`, '# Displays advanced arena commands', false)
        .addField(`${prefix}author`, '# Displays the authors of the bot', false)
        .addField(`${prefix}mtop [map] {username} {server(pro/beginner)} `, '# Shows current map/player records', false)
        .addField(`${prefix}servers`, '# Displays our servers and advanced server commands', false)
        .addField(`${prefix}profile [username] {server(pro/beginner)}`, '# Shows user stats', false)
        .addField(`${prefix}hello`, '# Checks if bot is online / says hello', false)
        .addField(`${prefix}version`, '# Displays the current bot version', false)
        .addField(`${prefix}nolife [username]`, '# Displays a users playtime on the surf server', false)
        .addField(`${prefix}whitelist [add/rm] [steamID/steamID64]`, '# Adds/Removes a player from the vip-server whitelist (VIP Only Command)', false)
        //.addField(`${prefix}btop [bonusnumber] [map]`, '# Shows current bonus record', false)
        .addField(`${prefix}unixend`, '# Displays time till end of the world', false)
        .addField(`${prefix}random`, '# Displays all random commands', false)
        .addField(`${prefix}z4lab`, '# Displays community links', false)

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};
