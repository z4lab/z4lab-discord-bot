const { RichEmbed } = require("discord.js");
const { prefix } = require('../config/bot.json'); 

module.exports.run = function (bot, message, args, prefix) {

    let embed = new RichEmbed()
        .setTitle('z4lab Community Serverlist')
        .setThumbnail(bot.user.avatarURL)
        .addField(`[KZ] z4lab Climbing/Kreedz | 128 Tick`, '`' + prefix + 'kz` for connect and map information', false)
        .addField(`[ARENA] z4lab Multi 1v1 | PRIME | 128 Tick`, '`' + prefix + '1v1` for connect and map information', false)
        .addField(`[SURF] z4lab Beginner Surf | EASY | 102 Tick`, '`' + prefix + 'beginner` for connect and map information', false)
        .addField(`[SURF] z4lab Pro Surf | HARD | 64 Tick`, '`' + prefix + 'pro` for connect and map information', false)
        .addField(`[SURF] z4lab VIP/Whitelist Surf | 102 Tick`, '`' + prefix + 'vipsurf` for connect and map information', false)
        .addField(`[FFA/DM] z4lab Warmup | PRIME | D2 Only | 128 Tick`, '`' + prefix + 'warmup` for connect and map information', false);
    return message.channel.send(embed);

};

module.exports.help = {
    name: "servers",
    category: "main",
    usage: false,
    permissionLvl: 0
};