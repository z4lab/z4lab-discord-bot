const Discord = require("discord.js");
const mysql = require("mysql");         // is this really needed here?
const colors = require('colors/safe');
const steam = require('steamidconvert')();  // is this really needed here?
const SteamAPI = require('steamapi');   // is this really needed here?
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]); // is this really needed here?

module.exports.run = function (bot, message, args, prefix){

    let embed = new Discord.RichEmbed()
        .setTitle('Available commands:')
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
