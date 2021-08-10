module.exports = () => {

	const Bot = require(process.cwd());

	if (Bot.Settings.channels?.whitelist && Bot.Settings.channels?.blacklist) return Bot.Logger.error("Discord Inhibitors", "Channel black- and whitelist defined! Ignoring all defined channels!");
	if (Bot.Settings.channels?.whitelist) {
		if (!Array.isArray(Bot.Settings.channels?.whitelist)) Bot.Settings.channels.whitelist = [Bot.Settings.channels?.whitelist];
		Bot.dispatcher.addInhibitor(msg => { if (!Bot.Settings.channels.whitelist.includes(msg.channel.id)) return { reason: "channel not whitelisted" } });
		Bot.Logger.info("Discord Inhibitors", "Whitelisted channel(s) [%j]", String(Bot.Settings.channels.whitelist).replace(/[||]/g, ""));
	}
	if (Bot.Settings.channels?.blacklist) {
		if (!Array.isArray(Bot.Settings.channels?.blacklist)) Bot.Settings.channels.blacklist = [Bot.Settings.channels?.blacklist];
		Bot.dispatcher.addInhibitor(msg => { if (Bot.Settings.channels.blacklist.includes(msg.channel.id)) return { reason: "channel blacklisted" } });
		Bot.Logger.info("Discord Inhibitors", "Blacklisted channel(s) [%j]", String(Bot.Settings.channels.blacklist).replace(/[||]/g, ""));
	}

}