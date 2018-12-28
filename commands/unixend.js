const Discord = require("discord.js");
const colors = require('colors/safe');
const config = require("../config/bot.json");
const toDuration = require('humanize-duration');

module.exports.run = function (bot, message, args, prefix){

    let time = Math.floor(2147483647 - Math.floor((message.createdAt / 1000))) * 1000;

    duration = toDuration(time);

    let embed = new Discord.RichEmbed()
        .setTitle('Time until Unixtime Overflow :')
        .setThumbnail(bot.user.avatarURL)
        .addField(String(duration))
        .addField(More Information,'https://en.wikipedia.org/wiki/Year_2038_problem', true);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "unixend"
};
