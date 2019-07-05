const { RichEmbed } = require("discord.js");

module.exports.run = function (bot, message, args, prefix) {

    let embed = new RichEmbed()
        .setTitle('z4lab Random Commands Overview')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}woof`, 'displays a random doggo', false)
        .addField(`${prefix}meow`, 'displays a random cat', false)
        .addField(`${prefix}shiba`, 'displays a random shiba', false)
        .addField(`${prefix}gs`, 'displays a random shepherd picture', false)
        .addField(`${prefix}fox`, 'displays a random fox', false)
        .addField(`${prefix}toothless`, 'displays a random Toothless gif', false);

    return message.channel.send(embed);

};

module.exports.help = {
    name: "random",
    category: "main",
    usage: false,
    description: "displays all random commands available",
    permissionLvl: 0
};