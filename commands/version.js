const Discord = require("discord.js");
const colors = require('colors/safe');
const {
    version
} = require("discord.js");
const config = require("../config/bot.json");

module.exports.run = function (bot, message, args, prefix){

    let embed = new Discord.RichEmbed()
        .setTitle('z4lab Discord Bot :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`Client Version`, `v${config.version.version}`, true)
        .addField(`Client Build`, config.version.build, true)
        .addField(`DiscordJS Version`, `v${version}`, true)
        .addField(`NodeJS Version`, `${process.version}`, true);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "version"
};