const Discord = require("discord.js");
const colors = require('colors/safe');
const config = require("../config/bot.json");


module.exports.run = function (bot, message, args, prefix){

    let embed = new Discord.RichEmbed()
        .setTitle('z4lab Discord Bot :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`Main Script`, `<@235809101051985920>`, true)
        .addField(`additionally Stuff/Ideas`, `<@521468077817200643>`, true)
        .addField(`Github Repository`, `https://github.com/totles/z4lab-discord-bot`, true);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "author"
};