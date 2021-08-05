const { Client } = require("discord.js-commando");
const Bot = new Client({ owner: "235809101051985920", commandPrefix: "." }); //config

/**
 * Bot command registry
 * */
Bot.registry
	.registerDefaults()
	.registerGroups([
		['admin', 'Admin'],
		['surftimer', 'SurfTimer'],
		['fun', 'Fun'],
	])
	.registerCommandsIn(require("path").join(process.cwd(), 'commands'));

/**
 * SQLite3 Databases
 * */
Bot.DB = {
	Main: require("better-sqlite3")(require("path").join(process.cwd(), 'Main.db')),
	Cache: require("better-sqlite3")(":memory:")
};


/**
 * Logger
 * */
Bot.Logger = require("npmlog");
Bot.Logger.headingStyle = { bg: '', fg: 'yellow' };
Object.defineProperty(Bot.Logger, 'heading', { get: () => { return "[" + Math.floor(new Date().getTime() / 1000) + "]" } });

/**
 * Util Functions
 * */
Bot.Utils = {};

require("fs").readdir(require("path").join(process.cwd(), "utils"), (e, f) => {
	f.filter(i => i.split(".").pop() === "js").forEach(u => {
		Bot.Utils[u.split(".")[0]] = require(require("path").join(process.cwd(), "utils", u.split(".")[0]));
		Bot.Logger.info("Discord Util", "Initially loaded util function. [%s]", u.split(".")[0]);
	});
	Bot.emit("utilsLoaded", null);
});

/**
 * Event Handler
 * */
Bot.on("ready", () => {
	Bot.Logger.info("Discord Main", "Logged into %s [%s]", Bot.user.tag, Bot.user.id);
	Bot.Utils.loadPresence({ activity: Bot.Settings.activity });
});

Bot.once("utilsLoaded", () => {
	Bot.Utils.loadSettings();
});

Bot.on("settingsFetched", settings => {
	Bot.Settings = settings.public;
	Bot.login(settings.private.discord.token);
});

Bot.on("shardDisconnect", e => {
	Bot.Utils.loadUtils(null, true, true);
	Bot.Utils.initSettings();
	Bot.Logger.info("Discord Main", "Force reconnected to %s [%s]", Bot.user.tag, Bot.user.id);
	if (!e.wasClean) Bot.Logger.error("Discord Main", "No clean shard disconnected occured! Check your connection.");
	setTimeout(() => Bot.Utils.loadPresence({ activity: Bot.Settings.activity }), 5000);
});

/**
 * Export Bot Class for other files
 * */
module.exports = Bot;

/**
 * Handle Process exit
 * */
process.on('exit', () => {
	Bot.Logger.warn("Process", "Closing process...");
	Bot.Logger.info("SQLite3", "Closing DB connections...");
	Object.keys(Bot.DB).forEach(db => {
		Bot.DB[db].close();
		Bot.Logger.info("SQLite3", "Closed connection for [%s]", db);
	});
});
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));