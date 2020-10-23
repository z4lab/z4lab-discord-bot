const { RichEmbed } = require("discord.js");
const dbPost = require("../util/dbPost");

module.exports.run = async function (bot, message, args) {

	const usage = new RichEmbed()
		.setTitle('z4lab Discord Bot whitelist usage')
		.setThumbnail(bot.user.avatarURL)
		.addField(`${bot.config.main.prefix}whitelist add [STEAMID/STEAMID64/CUSTOM-URL]`, '└ Add a player to the whitelist', false)
		.addField(`${bot.config.main.prefix}whitelist rm/remove [STEAMID/STEAMID64/CUSTOM-URL]`, '└ Remove a player to the whitelist', false)
		.addField(`${bot.config.main.prefix}whitelist info [@user]`, '└ Get player\'s whitelist info', false);


	if (!args[0]) return message.channel.send(usage);

	if (args[0] === 'add') { //add command

		let { whitelist } = require("../util/db/sql");

		if (await whitelist.allowedAdd(message.member)) {

			if (!args[1]) return message.channel.send(usage);

			let result = await dbPost.whitelistAdd(bot.db.db_whitelist, args[1], message.author);

			if (result.error) return message.channel.send(result.error.message);
			if (result.embed) return message.channel.send(result.embed);

		} else {

			return message.channel.send("```md\n[Whitelist] You have exceeded your maximum number of whitelisted accounts! ]:```");

		}

	} else if (args[0] === 'rm' || args[0] === 'remove') { //todo: check for account count in db.whitelist
		let del_access = false;
		bot.config.whitelist.allowedIDs.remove.forEach(role => {
			if (message.member.roles.has(role)) del_access = true;
		});

		if (!del_access) {

			let messageArray = ['Failure is simply the opportunity to begin again, this time more intelligently.',
				'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.',
				'If two wrongs don\'t make a right, try three.',
				'I am not lazy, I am on energy saving mode.',
				'People say nothing is impossible, but I do nothing every day.',
				'The elevator to success is out of order. You’ll have to use the stairs.',
				'The answer you\'re looking for is inside of you, but it\'s wrong.',
				'If you think nobody cares if you\'re alive, try missing a couple of payments.',
				'I thought this would never happen, but you just don\'t care enough for me to give you an answer.',
				'If you want me to answer that question, you might want to do something better.'
			];

			let random = Math.floor(Math.random() * messageArray.length);

			return message.channel.send(messageArray[random]);

		}
		//remove command
		if (!args[1]) return message.channel.send(usage);

		let result = await dbPost.whitelistRemove(bot.db.db_whitelist, args[1]);

		if (result.error) return message.channel.send(result.error.message);
		if (result.embed) return message.channel.send(result.embed);
		return;

	} else if (args[0] === "info") {

		let id = message.author.id;
		if (message.mentions.members && message.mentions.members.array()[0]) id = message.mentions.members.array()[0].id;

		let { whitelist } = require("../util/db/sql");
		let result = await whitelist.check(id, message.mentions.members.array() && message.mentions.members.array().length > 0);

		if (typeof result === "string") return message.channel.send(result);

		let tag = message.author.tag;
		if (message.mentions.members.array() && message.mentions.members.array().length > 0) tag = message.mentions.members.array()[0].user.tag;

		let embed = new RichEmbed().setTitle("z4lab Whitelist - " + tag);

		result.forEach(account => {
			embed
				.addField("Profile:", account.steam)
				.addField("Added on:", account.timestamp);
		});

		return message.channel.send(embed);

	}
};

module.exports.help = {
	name: "whitelist",
	category: "main",
	usage: [{
		command: "add [STEAMID/STEAMID64/CUSTOM-URL]",
		description: "Add a player to the whitelist"
	}, {
		command: "rm/remove [STEAMID/STEAMID64/CUSTOM-URL]",
		description: "Remove a player to the whitelist"
	}, {
		command: "info [@user]",
		description: "Get player\'s whitelist info"
	}],
	description: "add or remove a player on our VIP Surf Server's whitelist",
	permissionLvl: 1
};