/**
 * node_module require of the whole bot
 * 
 * I thought it would be nice to require the whole modules only ones.
 * Like this you don't have the problem of naming them different or messing up to whole code :)
 * 
 * Even reloading them or the /util files would work way easier :)
 */

// TODO: Move util functions into modules

module.exports = function (bot) {

	bot.modules = {}; // clear or create modules object

	bot.modules.core = {};
	bot.modules.core.discordjs = require("discord.js");
	bot.modules.core.gamedig = require("gamedig");
	bot.modules.core.mysql = require("mysql");
	bot.modules.core.sqlite3 = require("sqlite3");
	bot.modules.core.srcdsRcon = require("srcds-rcon");
	bot.modules.core.superagent = require("superagent");

	bot.modules.core.steam = {};
	bot.modules.core.steam.api = require("steamapi");
	bot.modules.core.steam.id = require("steamid");
	bot.modules.core.steam.idconvert = require("steamidconvert")();

	bot.modules.file = {};
	bot.modules.file.fs = require("fs");
	bot.modules.file.path = require("path");

	bot.modules.util = {};
	bot.modules.util.cities = require("all-the-cities");
	bot.modules.util.colors = require("colors/safe");
	bot.modules.util.humanizeDuration = require("humanize-duration");

};