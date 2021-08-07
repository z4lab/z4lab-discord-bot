/**
 * 
 * @param {Message} message - message object from the reload request
 * @param {boolean} forceOverwrite - if true renews existing functions
 * @param {boolean} removeOld - if true removes no longer existing files from functions
 */

module.exports = (message = null, forceOverwrite = false, removeOld = false) => {

	const Bot = require(process.cwd());
	if (!Bot.Utils) Bot.Utils = {};

	var files = [];

	require("fs").readdir(require("path").join(process.cwd(), "utils"), (e, f) => {
		f.filter(i => i.split(".").pop() === "js").forEach(u => {
			if (!Bot.Utils[u.split(".")[0]]) {
				try {
					Bot.Utils[u.split(".")[0]] = require(require("path").join(process.cwd(), "utils", u.split(".")[0]));
					if (typeof Bot.Utils[u.split(".")[0]] != "function") {
						Bot.Utils[u.split(".")[0]] = () => { };
						Bot.Logger.warn("Discord Util", "Replaced invalid util function with empty function! [%s]\nMake sure to use 'module.exports'!", u.split(".")[0]);
					} else Bot.Logger.info("Discord Util", "Loaded util function. [%s]", u.split(".")[0]);
				} catch (e) {
					Bot.Logger.error("Discord Util", "Failed to load util function. [%s]", u.split(".")[0]);
				}
				
			} else if (forceOverwrite) {
				try {
					delete Bot.Utils[u.split(".")[0]];
					Bot.Utils[u.split(".")[0]] = require(require("path").join(process.cwd(), "utils", u.split(".")[0]));
					if (typeof Bot.Utils[u.split(".")[0]] != "function") {
						Bot.Utils[u.split(".")[0]] = () => { };
						Bot.Logger.warn("Discord Util", "Replaced invalid util function with empty function! [%s]\nMake sure to use 'module.exports'!", u.split(".")[0]);
					} else Bot.Logger.info("Discord Util", "Force reloaded util function. [%s]", u.split(".")[0]);
				} catch (e) {
					Bot.Logger.error("Discord Util", "Failed to force load util function. [%s]", u.split(".")[0]);
				}
			}
			files.push(u.split(".")[0]);
		});
		Object.keys(Bot.Utils).forEach(func => {
			if (!files.includes(func)) {
				Bot.Logger.warn("Discord Util", "Missing file for util function found! [%s]", func);
				if (removeOld) {
					delete Bot.Utils[func];
					Bot.Logger.warn("Discord Util", "Removed function! [%s]", func);
				}
			}
		});
		Bot.emit("utilsLoaded", message);
	});

	
}