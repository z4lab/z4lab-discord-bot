const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    
    let {body} = await superagent
    .get("https://aws.random.cat/meow");

    let catembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("here is a random cat for you")
    .setImage(body.file)
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);

    return message.channel.send(catembed);

};

module.exports.help = {
    name: "meow",
    category: "random",
    usage: false,
    description: "displays a random cat",
    permissionLvl: 0
};