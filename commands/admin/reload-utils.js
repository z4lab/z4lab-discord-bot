module.exports = class extends require('discord.js-commando').Command {
	constructor(client) {
		super(client, {
			name: 'reload-utils',
			aliases: ['rlu', 'rl-utils'],
			group: 'admin',
			memberName: 'reload-utils',
			description: 'Reload the util functions',
			ownerOnly: true,
			args: [{
				key: "force",
				prompt: "force",
				type: "string",
				default: "-"
			}]
		});
	}

	run(message, args) {
		const Bot = require(process.cwd());
		Bot.Logger.warn("Discord Util", "Reload - requested from %s [%s]", message.author.tag, message.author.id);
		message.say("Reloading utils shall be your command :)").then(m => require(process.cwd()).Utils.loadUtils(m, (args.force == "force"), true));
	}
};