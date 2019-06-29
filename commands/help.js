const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix){

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot Commands Overview')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}z4lab`, 'displays our community links', false)
        .addField(`${prefix}arena`, 'displays advanced arena commands', false)
        .addField(`${prefix}author`, 'displays the author of this bot', false)
        .addField(`${prefix}mtop [map] {username} {server(pro/beginner)} `, 'shows current map/player records', false)
        .addField(`${prefix}servers`, 'displays our servers and advanced server commands', false)
        .addField(`${prefix}profile [username] {server(pro/beginner)}`, 'displays user stats', false)
        .addField(`${prefix}version`, 'displays the current version of this bot', false)
        .addField(`${prefix}nolife [username]`, 'displays a users playtime on our surf servers', false)
        .addField(`${prefix}whitelist [add/rm] [steamID/steamID64]`, 'add or remove a player on our VIP Surf Server (VIP only command)', false)
        //.addField(`${prefix}btop [bonusnumber] [map]`, '# Shows current bonus record', false)
        .addField(`${prefix}unixend`, 'countdown to the worlds end', false)
        .addField(`${prefix}random`, 'displays all random commands available', false)
        .addField(`${prefix}weather [city/village]`, 'show the current weather for the given city or village', false)

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};
