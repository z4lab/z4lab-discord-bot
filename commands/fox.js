const superagent = require("superagent");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let { body } = await superagent.get("https://randomfox.ca/floof/");

    let catembed = new RichEmbed()
    .setTitle("here is a random fox for you")
    .setImage(body.image)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "fox",
    category: "random",
    usage: false,
    description: "displays a random fox",
    permissionLvl: 0
};