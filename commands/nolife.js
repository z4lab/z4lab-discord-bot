const { RichEmbed } = require("discord.js");
const toDuration = require('humanize-duration');
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);
const dbRequest = require('../util/dbRequest');

module.exports.run = async function (bot, message, args, prefix, db_beginner, db_pro) {

    if (!args[0]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + prefix + 'nolife [Name] ]:```');
    let name = args[0];

    var result = await dbRequest.getPlaytime(name, db_beginner, db_pro);

    if (result.error.print) return message.channel.send(result.error.name);
    if (result.embed) return message.channel.send(result.embed);
    return;

};

module.exports.help = {
    name: "nolife",
    category: "main",
    usage: `${prefix} nolife [name]`,
    permissionLvl: 0
};