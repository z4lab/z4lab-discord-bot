const { RichEmbed } = require("discord.js");
const { prefix } = require('../config/bot.json'); 

module.exports.run = function (bot, message, args, prefix) {

    let embed = new RichEmbed()
        .setTitle('z4lab Serverlist')
        .setThumbnail(bot.user.avatarURL)
        .addField(`[ARENA] z4lab Multi 1v1 Server 128 Tick `, '`' + prefix + '1v1` for more infos', false)
        .addField(`[SURF] z4lab Beginner Surf Server 102 Tick`, '`' + prefix + 'beginner` for more infos', false)
        .addField(`[SURF] z4lab Experienced Surf Server 64 Tick`, '`' + prefix + 'pro` for more infos', false)
        .addField(`[KZ] z4lab Climb Server 128 Tick`, '`' + prefix + 'kz` for more infos', false)
        .addField(`[FFA/DM] z4lab Warmup Server D2 Only 128 Tick`, '`' + prefix + 'warmup` for more infos', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "servers"
};