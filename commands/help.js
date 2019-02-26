const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix){

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot Commands Overview')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}servers`, '# Displays our servers and advanced server commands', false)
        .addField(`${prefix}arena`, '# Displays advanced arena commands', false)
        .addField(`${prefix}mtop [map] {username} {server(pro/beginner)} `, '# Shows current map/player records', false)
        //.addField(`${prefix}btop [bonusnumber] [map]`, '# Shows current bonus record', false)
        .addField(`${prefix}profile [username] {server(pro/beginner)}`, '# Shows user stats', false)
        .addField(`${prefix}author`, '# Displays the authors of the bot', false)
        .addField(`${prefix}version`, '# Displays the current bot version', false)
        .addField(`${prefix}unixend`, '# Displays time till end of the world', false)
        .addField(`${prefix}z4lab`, '# Displays community links', false)
        .addField(`${prefix}whitelist [add/rm] [steamID/steamID64]`, '# Adds/Removes a player from the vip-server whitelist (VIP Only Command)', false)
        .addField(`${prefix}woof`, '# Displays random dog picture', false)
        .addField(`${prefix}meow`, '# Displays random cat picture', false)
        .addField(`${prefix}shiba`, '# Displays random shiba picture', false)
        .addField(`${prefix}gs`, '# Displays random german shepherd picture', false)
        .addField(`${prefix}fox`, '# Displays random fox picture', false)
        .addField(`${prefix}toothless`, '# get a random toothless gif', false)
        .addField(`${prefix}hello`, '# Checks if bot is online / says hello', false)
        .addField(`${prefix}nolife [username]`, '# Shows user playtime on our surf server', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};
