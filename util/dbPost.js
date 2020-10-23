const dbRequest = require(__dirname+"/dbRequest");
const formatID = require(__dirname+"/formatID");

const steamapi = new global.bot.modules.core.steam.api(global.bot.config.main.steam["api-key"]);

var dbPost = {};
module.exports = dbPost;

/**
 * whitelistAdd Function
 * @param {string} id player id -- user input -- indirectly
 * @param {object} mysql vsurf server mysql connection
 */
dbPost.whitelistAdd = async function whitelistAdd(mysql, id, author) {

	var result = {};
	result.error = false;
	result.embed = false;

	id = await formatID(id);	

	await global.bot.sleep(10);

	let idCheck = await dbRequest.checkVipList(mysql, id);

	result.idCheck = idCheck;

	if (idCheck.vip) {

		steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(id))).then(summary => {

			let embed = new global.bot.modules.core.discordjs.RichEmbed()
				.setTitle('z4lab Whitelist')
				.setDescription('Player is already on the whitelist!')
				.setThumbnail(summary.avatar.large)
				.addField(`[*] ${summary.nickname}`, summary.url);

			result.embed = embed;

		});
	}

	await global.bot.sleep(100);

	if (!idCheck.vip) {

		mysql.query("INSERT INTO `" + global.bot.config.dbs.whitelist.database + "`.`mysql_whitelist` (`steamid`) VALUES ('" + id + "');", function (err) {

			if (err && err.code != 'ER_DUP_ENTRY') {
				result.error.id = 1;
				result.error.msg = '```md\n[Error] Failed to whitelist the ID! ]:```';
				return;
			}


			if (id) {

				steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(id))).then(summary => {

					let { whitelist } = require("./db/sql");
					whitelist.add(author.id, summary.steamID); //add discord and steamID to local bot database

					let embed = new global.bot.modules.core.discordjs.RichEmbed()
						.setTitle('z4lab Whitelist')
						.setDescription('Player successfully added to the whitelist!\nsteam://connect/94.130.8.161:27040')
						.setThumbnail(summary.avatar.large)
						.addField(`[+] ${summary.nickname}`, summary.url);

					result.embed = embed;
				});
			}
		});
	}


	await global.bot.sleep(500);
	return result;

};

/**
 * whitelistRemove Function
 * @param {string} id player id -- user input -- indirectly
 * @param {object} mysql vsurf server mysql connection
 */
dbPost.whitelistRemove = async function whitelistRemove(mysql, id) {

	var result = {};
	result.error = false;
	result.embed = false;

	id = await formatID(id);

	await global.bot.sleep(10);

	let idCheck = await dbRequest.checkVipList(mysql, id);

	result.idCheck = idCheck;

	if (idCheck.vip) {

		mysql.query("DELETE FROM `" + global.bot.config.dbs.whitelist.database + "`.`mysql_whitelist` WHERE (`steamid` = '" + id + "');", function (err) {

			console.log(err);

			if (!err) {
				steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(id))).then(summary => {

					let { whitelist } = require("./db/sql");
					whitelist.remove(false, summary.steamID); //remove discord and steamID from local bot database

					let embed = new global.bot.modules.core.discordjs.RichEmbed()
						.setTitle('z4lab Whitelist')
						.setDescription('Player removed from the whitelist!')
						.setThumbnail(summary.avatar.large)
						.addField(`[-] ${summary.nickname}`, summary.url);

					result.embed = embed;

				});
			} else {
				result.error.id = 1;
				return result.error.message("```md\n[Error] Failed to remove player from whitelist! ]:```");
			}

		});
	} else {

		if (id) {
			steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(id))).then(summary => {

				let embed = new global.bot.modules.core.discordjs.RichEmbed()
					.setTitle('z4lab Whitelist')
					.setDescription('Player is not on the whitelist!')
					.setThumbnail(summary.avatar.large)
					.addField(`[*] ${summary.nickname}`, summary.url);

				result.embed = embed;

			});
		}

	}

	await global.bot.sleep(500);
	return result;

};