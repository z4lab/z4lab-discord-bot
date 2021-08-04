module.exports = class extends require('discord.js-commando').Command {
	constructor(client) {
		super(client, {
			name: 'reload-all',
			aliases: ['rla', 'rl-all', 'rl'],
			group: 'admin',
			memberName: 'reload-all',
			description: 'Reload the whole bot',
			ownerOnly: true,
			args: []
		});
	}

	run(message) {
		message.say("Rebooting shall be your command :)").then(() => {
			const Bot = require(process.cwd());
			Bot.destroy();
			Bot.Logger.warn("Discord Main", "Rebooting - requested from %s [%s]", message.author.tag, message.author.id);
		});
	}
};