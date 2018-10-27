const Discord = require("discord.js");
const mysql = require("mysql");
const colors = require('colors/safe');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports.run = async (bot, message, args, prefix) => {

    message.delete();

    let embed = new Discord.RichEmbed()
        .setTitle('Surftimer-Bot Commands :')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}mtop [map]`, '└ Shows current map record', false)
        .addField(`${prefix}btop [bonusnumber] [map]`, '└ Shows current bonus record', false)
        .addField(`${prefix}profile [steamid64]`, '└ Shows user stats', false)
        .addField(`${prefix}nm [mapcount {1-10}]`, '└ Shows latest added maps', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "help"
};