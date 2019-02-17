const superagent = require('superagent');
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
    let { body } = await superagent.get(`https://dog.ceo/api/breed/germanshepherd/images/random`);
    
    let catembed = new RichEmbed()
    .setTitle("Just a random German Shepherd : ")
    .setImage(body.message)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "gs",
};