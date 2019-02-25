const superagent = require('superagent');
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    let { body } = await superagent.get(`https://dog.ceo/api/breed/shiba/images/random`);
    
    let catembed = new RichEmbed()
    .setTitle("here is a random shiba for you")
    .setImage(body.message)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "shiba",
};