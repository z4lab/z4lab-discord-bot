module.exports = class extends require('discord.js-commando').Command {
	constructor(client) {
		super(client, {
			name: 'reload-settings',
			aliases: ['rls', 'rl-settings'],
			group: 'admin',
			memberName: 'reload-settings',
			description: 'Reload the whole bot',
			ownerOnly: true,
			args: []
		});
	}

	run(message) {
		const Bot = require(process.cwd());
		Bot.Logger.warn("SQLite3 Main", "Reload - requested from %s [%s]", message.author.tag, message.author.id);
		message.say("Reloading settings shall be your command :)").then(() => Bot.Utils.loadSettings());
	}
};