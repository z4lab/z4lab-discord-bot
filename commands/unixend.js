const Discord = require("discord.js");
const colors = require('colors/safe');
const config = require("../config/bot.json");
const toDuration = require('humanize-duration');

module.exports.run = async (bot, message, args, prefix) => {

    let time = Math.floor(2147483647 - Math.floor((message.createdAt / 1000))) * 1000;

    duration = toDuration(time);

    let embed = new Discord.RichEmbed()
        .setTitle('Time until unixend :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`Time left`, String(duration), false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "unixend"
};