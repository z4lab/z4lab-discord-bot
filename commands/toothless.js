const superagent = require('superagent');
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    let body = await superagent.get(`https://z4lab.com/gifs/toothless.php`);

    let catembed = new RichEmbed()
    .setTitle("Random picture of Toothless : ")
    .setImage(body.text)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "toothless",
};