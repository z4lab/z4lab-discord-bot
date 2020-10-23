const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message) => {
	
	let {body} = await superagent
		.get("https://dog.ceo/api/breeds/image/random");

	let dogembed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("here is a random doggo for you")
		.setImage(body.message)
		.setTimestamp(new Date())
		.setFooter(`requested by ${message.author.tag}`);

	return message.channel.send(dogembed);

};

module.exports.help = {
	name: "woof",
	category: "random",
	usage: false,
	description: "displays a random doggo",
	permissionLvl: 0
}