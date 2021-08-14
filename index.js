const { Client } = require("discord.js-commando");
const Bot = new Client({ owner: "235809101051985920", commandPrefix: "." });

/**
 * Bot command registry
 * */
Bot.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands({ eval: false, unknownCommand: false })
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
	SQLite: {
		Main: require("better-sqlite3")(require("path").join(process.cwd(), 'Main.db')),
		Cache: require("better-sqlite3")(":memory:")
	},
	MariaDB: { }
};


/**
 * Logger
 * */
Bot.Logger = require("npmlog");
Bot.Logger.headingStyle = { bg: '', fg: 'yellow' };
Object.defineProperty(Bot.Logger, 'heading', { get: () => { return "[" + Math.floor(new Date().getTime() / 1000) + "]" } });
Bot.Logger.info("", "\nLOG STARTED\n");

/**
 * Util Functions
 * */
Bot.Utils = {};

require("fs").readdir(require("path").join(process.cwd(), "utils"), (e, f) => {
	f.filter(i => i.split(".").pop() === "js").forEach(u => {
		Bot.Utils[u.split(".")[0]] = require(require("path").join(process.cwd(), "utils", u.split(".")[0]));
		if (typeof Bot.Utils[u.split(".")[0]] != "function") {
			Bot.Utils[u.split(".")[0]] = () => { };
			Bot.Logger.warn("Discord Util", "Replaced invalid util function with empty function! [%s]", u.split(".")[0]);
		} else Bot.Logger.info("Discord Util", "Initially loaded util function. [%s]", u.split(".")[0]);
	});
	Bot.emit("utilsLoaded", null);
});

Bot.Intervals = {};
Bot.Timeouts = {};

/**
 * Event Handler
 * */
Bot.on("ready", () => {
	Bot.Logger.info("Discord Main", "Logged into %s [%s]", Bot.user.tag, Bot.user.id);
	Bot.Utils.loadPresence({ activity: Bot.Settings.activity });
	Bot.Utils.createIntervals();
	Bot.Utils.createInhibitors();
});

Bot.once("utilsLoaded", () => {
	Bot.Utils.loadSettings();
});

Bot.on("settingsFetched", settings => {
	Bot.Settings = settings.public;
	if (settings.private.discord?.token) Bot.login(settings.private.discord.token);
	else {
		Bot.Logger.error("Discord Main", "No discord token provied. Exiting...");
		process.exit();
	}
	Bot.commandPrefix = Bot.Settings.discord?.prefix || null; // Setting to null means that the default prefix from "options" will be used instead.
	if (typeof settings.private.mariadb == "object") Object.keys(settings.private.mariadb).forEach(db => Bot.utils.createMariaDBConnection(db, settings.private.mariadb[db]));
});

Bot.on("realoadAll", () => {
	Bot.Utils.loadUtils(null, true, true);
	Bot.Utils.loadSettings();
	Bot.Timeouts.loadPresenceAfterReload = setTimeout(() => Bot.Utils.loadPresence({ activity: Bot.Settings.activity }), 5000);
	Bot.Utils.createIntervals();
	Bot.Utils.createInhibitors();
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
	Object.keys(Bot.DB.SQLite).forEach(db => {
		Bot.DB.SQLite[db].close();
		Bot.Logger.info("SQLite3", "Closed connection for [%s]", db);
	});
});
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));