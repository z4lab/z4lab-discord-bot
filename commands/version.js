const { RichEmbed, version} = require("discord.js");
const superagent = require('superagent');
const config = require("../config/bot.json");

module.exports.run = async (bot, message, args, prefix) => {

    let res = await superagent.get('https://raw.githubusercontent.com/totles/z4lab-discord-bot/master/config/example-bot.json');

    var clientVersion = JSON.parse(res.text).version.version;
    var _version = config.version.version;
    var build;

    if (_version == clientVersion) {
        build = 'stable';
    } else {
        _version = _version.split('.');
        clientVersion = clientVersion.split('.');
        if (_version[1] == clientVersion[1] && Number(_version[2]) < Number(clientVersion[2])) build = 'outdated';
        if (_version[1] == clientVersion[1] && Number(_version[2]) > Number(clientVersion[2])) build = 'dev';
        if (Number(_version[1]) < Number(clientVersion[1])) build = 'outdated';
        if (Number(_version[1]) > Number(clientVersion[1])) build = 'dev';
    }

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot')
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