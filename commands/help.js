const Discord = require("discord.js");
const mysql = require("mysql");
const colors = require('colors/safe');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports.run = function (bot, message, args, prefix){

    let embed = new Discord.RichEmbed()
        .setTitle('z4lab-Bot Commands :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}mtop [map] {username/server(pro/beginner)} {server(pro/beginner)} `, '└ Shows current map/player record', false)
        .addField(`${prefix}btop [bonusnumber] [map]`, '└ Shows current bonus record', false)
        .addField(`${prefix}profile [username] {server(pro/beginner)}`, '└ Shows user stats', false)
        .addField(`${prefix}author`, '└ Shows the authors of the bot', false)
        .addField(`${prefix}version`, '└ Shows the current bot versions', false)
        .addField(`${prefix}unixend`, '└ Shows how much time until the world goes down', false)
        .addField(`${prefix}servers`, '└ Shows the serverlist and advanced server commands', false)
        .addField(`${prefix}arena`, '└ Shows advanced arena commands', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};