const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix) {

    let embed = new RichEmbed()
        .setTitle('z4lab Discord Bot Random Commands Overview')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}woof`, '# Displays random dog picture', false)
        .addField(`${prefix}meow`, '# Displays random cat picture', false)
        .addField(`${prefix}shiba`, '# Displays random shiba picture', false)
        .addField(`${prefix}gs`, '# Displays random german shepherd picture', false)
        .addField(`${prefix}fox`, '# Displays random fox picture', false)
        .addField(`${prefix}toothless`, '# get a random toothless gif', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "random"
};