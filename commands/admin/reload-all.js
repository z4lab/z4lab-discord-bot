module.exports = class extends require('discord.js-commando').Command {
	constructor(client) {
		super(client, {
			name: 'reload-all',
			aliases: ['rla', 'rl-all', 'rl'],
			group: 'admin',
			memberName: 'reload-all',
			description: 'Reload the whole bot',
			ownerOnly: true,
			args: [],
			throttling: {
				usages: 1,
				duration: 60
            }
		});
	}

	run(message) {
		message.say("Reloading everything shall be your command :)").then(() => {
			const Bot = require(process.cwd());
			Object.keys(Bot.Intervals).map(Interval => clearInterval(Interval));
			Bot.Logger.warn("Discord Main", "Reloading * - requested from %s [%s]", message.author.tag, message.author.id);
			Bot.emit("realoadAll");
		});
	}
};