module.exports = () => {

	const Bot = require(process.cwd());
	if (Bot.user.presence.activities.length <= 0) {
		Bot.Logger.warn("Discord Main", "Client presence does not contain any presence!");
		Bot.Logger.info("Discord Main", "Reapplying client presence.");
		Bot.Utils.loadPresence({ activity: Bot.Settings.activity });
	}

}