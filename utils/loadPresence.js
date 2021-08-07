/**
 * 
 * @param {PresenceData} presence
 */
module.exports = presence => {

	const Bot = require(process.cwd());
	Bot.user.setPresence(presence).then(() => {
		Bot.Logger.info("Discord Main", "Set client presence: %j", presence);
	});

}