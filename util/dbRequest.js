const steamapi = new global.bot.modules.core.steam.api(global.bot.config.main.steam["api-key"]);
const fixTime = require("../util/fixTime.js");
var dbRequest = {};
module.exports = dbRequest;
/**
 * getProfile function
 * @param {string} name player name -- user input
 * @param {string} server server name -- user input
 * @param {object} mysql beginner/pro server mysql connection
 */
dbRequest.getProfile = async function getProfile(name, server, mysql) {

	var result = {};
	result.error = {};
	result.error.id = 0;
	result.error.name = false;
	result.error.print = false;

	if (server == "pro") server = " Pro";
	else server = "";

	mysql.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, function (err, get) {
		if (err) {
			result.error.id = 1;
			result.error.name = "```md\n[Error] Failed to load client profile ]:```";
			result.error.print = true;
			return result;
		}
		if (!get[0]) {
			result.error.id = 1;
			result.error.name = "```md\n[Error] The user wasn't found in the database! ]:```";
			result.error.print = true;
			return result;
		}
		let country = get[0].country;
		let points = get[0].points;
		let finishedmaps = get[0].finishedmapspro;
		let sid = get[0].steamid;
		mysql.query(`SELECT * FROM ck_playerrank WHERE style = '0' ORDER BY points DESC`, function (err, get) {
			if (err) {
				result.error.id = 2;
				result.error.name = "```md\n[Error] Failed to load client profile ]:```";
				result.error.print = true;
				return result;
			}
			for (var i = 0; i < get.length; i++) {
				if (get[i].steamid == sid) var rank = i + 1;
			}
			steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(sid))).then(summary => {
				result.embed = new global.bot.modules.core.discordjs.RichEmbed()
					.setAuthor(`${summary.nickname} on our${server} Surf Server`, '', summary.url)
					.setThumbnail(summary.avatar.large)
					.addField('Country ', country, true)
					.addField('Rank ', `${rank}/${i}`, true)
					.addField('Points ', points, true)
					.addField('Finished Maps ', `${finishedmaps}`, true);
			});
		});
	});

	await global.bot.sleep(500);
	return result;

};
/**
 * getMaptime function
 * @param {string}  name player name -- user input
 * @param {boolean} record maprecord or not -- user input if name isnt defined
 * @param {object}  map map name -- user input
 * @param {string}  server server name -- user input
 * @param {object}  mysql pro server mysql connection
 */
dbRequest.getMaptime = async function getMaptime(name, record, map, server, mysql) {

	var result = {};
	result.error = {};
	result.error.id = 0;
	result.error.name = false;
	result.error.print = false;

	server = server.charAt(0).toUpperCase() + server.slice(1);

	var username = name;

	if (name != null) name = "AND name LIKE '%" + String(username) + "%'";
	else name = '';

	mysql.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} AND style = '0' ORDER BY runtimepro ASC`, async function (error, res) {
		if (error) {
			result.error.error = error;
			result.error.id = 1;
			result.error.name = 'Error while database request!';
			return console.log(result.error);
		} else {
			if (String(res) != []) map = res[0].mapname;


			if (String(res) == []) {
				mysql.query(`SELECT * FROM ck_maptier WHERE mapname LIKE '%${map}%'`, function (error, get) {
					if (error) {
						result.error.error = error;
						result.error.id = 1;
						result.error.name = 'Error while database request!';
						return console.log(result.error);
					}

					if (String(get) == [] && result.error.id == 0) {
						result.error.id = 2;
						result.error.name = '```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```';
						result.error.print = true;
					}

					if (name != '' && result.error.id == 0) {
						result.error.id = 3;
						result.error.name = '```md\n[Error] The player hasn\'t finished <' + get[0].mapname + '> yet! ]:```';
						result.error.print = true;
					}

					if (result.error.id == 0) {
						result.error.id = 4;
						result.error.name = '```md\n[Error] <' + get[0].mapname + '> wasn\'t finished yet! ]:```';
						result.error.print = true;
					}

					return;
				});
				await global.bot.sleep(100);
			}
			if (result.error.id == 0) {
				let ms = res[0].runtimepro * 1000;
				let round = ms > 0 ? Math.floor : Math.ceil;
				let minutes = fixTime(round(ms / 60000) % 60);
				let seconds = fixTime(round(ms / 1000) % 60);
				let milli = round(ms) % 1000;
				if (milli.length > '2') milli = fixTime(milli.slice(0, -1));
				else milli = fixTime(milli);
				let id = res[0].steamid;
				let playername = res[0].name;
				mysql.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
					if (err) console.log(err);
					for (var i = 0; i < get.length; i++) {
						if (get[i].steamid == id) {
							var rank = i + 1;
						}
					}
					var record = 'Map';
					var record2 = 'the record';
					if (name != '') {
						record = 'Player';
						record2 = 'his personal record';
					}
					result.runtime = '```md\n# ' + record + ' Record @ ' + server + ' Server #\n\n[' + playername + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + "." + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```';
				});
			}
		}
	});
	await global.bot.sleep(200);
	return result;
};
/**
 * getPlaytime function
 * @param {string} name player name -- user input
 * @param {object} mysql0 beginner server mysql connection
 * @param {object} mysql1 pro server mysql connection
 */
dbRequest.getPlaytime = async function getPlaytime(name, mysql0, mysql1) {

	var result = {};
	result.error = {};
	result.error.id = 0;
	result.error.name = '';
	result.error.print = false;

	var lastseen = '';
	var firstseen = '';
	var timealive = '';
	var timespec = '';
	var timeonline = '';
	var _timealive = '';
	var _firstseen = '';
	var _timespec = '';
	var _timeonline = '';

	mysql0.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, async function (err, beginner) {
		if (err) return console.log(String(err));
		var beginnerTime = beginner;
		mysql1.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, async function (err, pro) {
			if (err) return console.log(String(err));
			var proTime = pro;
			if (beginnerTime[0] && !proTime[0]) {
				lastseen = beginnerTime[0].lastseen;
				firstseen = beginnerTime[0].joined;
				timealive = beginnerTime[0].timealive;
				timespec = beginnerTime[0].timespec;
				timeonline = timealive + timespec;
			} else if (!beginnerTime[0] && proTime[0]) {
				lastseen = proTime[0].lastseen;
				firstseen = proTime[0].joined;
				timealive = proTime[0].timealive;
				timespec = proTime[0].timespec;
				timeonline = timealive + timespec;
			} else if (beginnerTime[0] && proTime[0] && beginnerTime[0].steamid64 == proTime[0].steamid64) {
				if (beginnerTime[0].lastseen > proTime[0].lastseen) lastseen = beginnerTime[0].lastseen;
				else lastseen = proTime[0].lastseen;
				if (beginnerTime[0].firstseen < proTime[0].firstseen) firstseen = beginnerTime[0].firstseen;
				else firstseen = proTime[0].firstseen;
				timealive = beginnerTime[0].timealive + proTime[0].timealive;
				timespec = beginnerTime[0].timespec + proTime[0].timespec;
				timeonline = timealive + timespec;
			} else {
				result.error.id = 1;
				result.error.name = '```md\n[Error] The user wasn\'t found in the database! ]:```';
				result.error.print = true;
			}
			if (result.error.id == 0) {
				_timealive = global.bot.modules.util.humanizeDuration(timealive * 1000, {
					units: ['mo', 'w', 'd', 'h', 'm'],
					round: true
				});
				_timespec = global.bot.modules.util.humanizeDuration(timespec * 1000, {
					units: ['mo', 'w', 'd', 'h', 'm'],
					round: true
				});
				_timeonline = global.bot.modules.util.humanizeDuration(timeonline * 1000, {
					units: ['mo', 'w', 'd', 'h', 'm'],
					round: true
				});
				_firstseen = global.bot.modules.util.humanizeDuration(firstseen * 1000, {
					units: ['mo', 'w', 'd', 'h', 'm'],
					round: true
				});


			}
			let id = "";
			if (!beginnerTime[0]) id = String(proTime[0].steamid64);
			else id = String(beginnerTime[0].steamid64);
			var summary = await steamapi.getUserSummary(id);
			result.embed = new global.bot.modules.core.discordjs.RichEmbed()
				.setAuthor(summary.nickname + ' on Surf Servers', '', summary.url)
				.setThumbnail(summary.avatar.large)
				.addField('Total time on Surf Servers', _timeonline, false)
				.addField('Time playing', _timealive, true)
				.addField('Time specating', _timespec, true)
				.addField('First seen', _firstseen, true)
				.setTimestamp(new Date(lastseen * 1000))
				.setFooter(`Last seen`);
		});
	});
	await global.bot.sleep(1000);
	return result;
}

/**
 * getVipList function
 * @param {object}  mysql vip srv mysql connection
 */
dbRequest.getVipList = async function getVipList(mysql) {

	var result = {};
	result.error = false;

	mysql.query(`SELECT * FROM mysql_whitelist`, function (error, res) {
		if (error) return result.error = error;
		result.raw = res;
	});

	await global.bot.sleep(100);

	result.list = {};
	result.list.string = "```md\n[Whitelist] contains < "+ result.raw.length +" > users: ]:\n\n";
	result.list.buffer = [];
	result.list.array = [];

	result.raw.forEach(async (steamid) => {
		let data = await getPlayerData(steamid.steamid);
		data.steamid = steamid.steamid;
		result.list.array.push(data);
		result.list.buffer.push(data.nickname);
	});

	await global.bot.sleep(500);

	var longestName = 0;

	result.list.buffer.forEach(name => {
		if (longestName < name.length) {
			longestName = name.length;
		} 
	});

	result.list.array.sort(function (a, b) {
		if (a.nickname > b.nickname) {
			return -1;
		}
		if (b.nickname > a.nickname) {
			return 1;
		}
		return 0;
	});
	result.list.array.reverse();
	result.list.array.forEach(user => {
		result.list.string += `[${user.nickname}]${String(".").repeat(longestName-user.nickname.length)} | <${user.steamid}> ]:\n`;
	});
	

	

	result.list.string += "```";

	return result;

}

/**
 * getPlayerData function
 * @param {object} steamid steam id of client
 */
var getPlayerData = dbRequest.getPlayerData = async function getPlayerData(steamid) {
	return await steamapi.getUserSummary(global.bot.modules.core.steam.idconvert.convertTo64(String(steamid)));
}


/**
 * checkVipList function
 * @param {object}  mysql vip srv mysql connection
 * @param {strng}   id	steamID/steamID64 from given user -- userinput
 */
dbRequest.checkVipList = async function checkVipList(mysql, id) {

	var result = {};
	result.error = false;
	result.vip = false;

	//id = await formatID(id);

	if (!id) {
		result.error = {
			id: 1,
			msg: 'md\n[Error] Invalid SteamID entered! ]:'
		};
		return result;
	}


	mysql.query(`SELECT * FROM mysql_whitelist WHERE steamid = '${id}'`, function (error, res) {
		if (error) return result.error = error;
		if (res.length != 0) result.vip = true;
		else result.vip = false;
	});

	await global.bot.sleep(100);
	return result;
}
