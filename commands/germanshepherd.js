const superagent = require("superagent");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let { body } = await superagent.get("https://dog.ceo/api/breed/germanshepherd/images/random");
    
    let catembed = new RichEmbed()
    .setTitle("here is a random german shepherd for you")
    .setImage(body.message)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "gs",
    category: "random",
    usage: false,
    description: "displays a random shepherd picture",
    permissionLvl: 0
};