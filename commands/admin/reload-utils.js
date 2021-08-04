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
				type: "boolean",
				default: false
			}]
		});
	}

	run(message, args) {
		message.say("Reloading Utils...").then(m => require(process.cwd()).Utils.loadUtils(m, args.force, true));
	}
};