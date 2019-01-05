const { RichEmbed } = require("discord.js");


module.exports.run = function (bot, message, args, prefix) {

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot Quick Links')
        .setThumbnail(bot.user.avatarURL)
        .addField('Homepage', '<https://z4lab.com>  ', true)
        .addField('Steam Group', '<https://z4lab.com/group/>', true)
        .addField('SourceBans', '<https://bans.z4lab.com>', true)
        .addField('Changelog', '<https://z4lab.com/log/>', true)
        .addField('Arena Stats', '<https://z4lab.com/arena/>', true)
        .addField('Staff appliaction', '<https://z4lab.com/staff/>', true)
        .addField('TeamSpeak', 'ts.z4lab.com', true);
        


    /*
Website: https://z4lab.com/
Apply For Staff: https://z4lab.com/staff
Changelog: https://z4lab.com/changelog/
Steam Group: https://z4lab.com/group
SourceBans: https://bans.z4lab.com/
Arena Stats: https://z4lab.com/arena/leaderboards.php/
TeamSpeak: ts.z4lab.com
        */

    return message.channel.send(embed);

};

module.exports.help = {
    name: "z4lab"
};