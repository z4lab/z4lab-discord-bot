module.exports.run = async (bot, message) => {

	let sql = require("../util/db/sql");
	let timestamp = require("../util/timeStamp");

	message.reply("Reloading...").then( answer => {

		console.log("");
		console.log(timestamp() + "[Reload] Request from " + message.author.tag);
		console.log("");

		sql.loadSettings(bot, message.channel, answer);

	});


};

module.exports.help = {
	name: "reload",
	category: "main",
	usage: false,
	description: "reloads bot",
	permissionLvl: 3
};