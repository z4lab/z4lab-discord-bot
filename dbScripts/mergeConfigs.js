// fetch data from db and write it into the config files

(async() => {
	const sql = require("sqlite3");
	const path = require("path");
	const fs = require("fs")
	const db = new sql.Database(path.resolve(__dirname, "../config/main.db"));
	const configs = {alias: {alias:[]}, bot: {channels: [], adminChannels: [], steam: {}}, channels: {log: {}, memberCount: {}}, dbs: {}, servers: {}, whitelist: {allowedIDs: {add: [], remove: []}}};

	var copy = function(src, dest) { // eslint-disable-line
		var oldFile = fs.createReadStream(src);
		var newFile = fs.createWriteStream(dest);
		oldFile.pipe(newFile);
	};
	
	var sleep = function (ms) {
		return new Promise(resolve => { // eslint-disable-line
			setTimeout(resolve, ms*1000);
		});
	};

	console.log("\x1b[2m[LOG]\x1b[0m \x1b[33mFetching data \x1b[0m[\x1b[5m...\x1b[0m]");

	// alias db -> config
	db.all("SELECT * FROM alias", [], (err, rows) => {
		if (err) {
			throw err;
		}
		let array = [];
		let alias = {};
		rows.forEach(row => {
			if (!alias[row.command]) alias[row.command] = [];
			alias[row.command].push(row.alias);
		});

		Object.keys(alias).forEach(command => {
			array.push({name: command, alias: alias[command]});
		});
		configs.alias.alias = array;
	});
	// alias db -> config

	// channels db -> config
	db.all("SELECT * FROM channels", [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach(row => {
			if (row.channeltype == 1) configs.bot.channels.push(row.channelid);
			if (row.channeltype == 2) configs.bot.adminChannels.push(row.channelid);
			if (row.channeltype == 3) configs.channels.log.channelID = row.channelid;
			if (row.channeltype == 4) configs.channels.memberCount.channelID = row.channelid;
		});
	});
	// channels db -> config

	// bot_config db -> config
	db.all("SELECT * FROM config_bot", [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach(row => {
			configs.bot[row.option] = row.value;
		});
		configs.bot.presence = {
			game: {
				name: configs.bot.presencePrefix
			},
			status: "online"
		};
		configs.bot.version = {
			inName: Boolean(configs.bot.versionInName),
			version: require("../package.json").version || "1.34.3",
			build: "stable"
		}
		configs.bot.steam["api-key"] = configs.bot.steamApiKey;
		configs.bot.prefix = configs.bot.botPrefix;
		configs.bot.token = configs.bot.botToken;
		delete configs.bot.steamApiKey;
		delete configs.bot.botPrefix;
		delete configs.bot.botToken;
		delete configs.bot.versionInName;
		delete configs.bot.presencePrefix;
	});
	// bot_config db -> config

	// database db -> config
	db.all("SELECT * FROM database", [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach(row => {
			let name = row.name;
			delete row.name;
			configs.dbs[name] = row;
		});
	});
	// database db -> config

	// servers db -> config
	db.all("SELECT * FROM servers", [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach(row => {
			let name = row.name;
			delete row.name;
			configs.servers[name] = row;
		});
	});
	// servers db -> config

	// whitelist_roles db -> config
	db.all("SELECT * FROM whitelist_roles", [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach(row => {
			if (row.type == 1) configs.whitelist.allowedIDs.add.push(row.roleid);
			if (row.type == 2) configs.whitelist.allowedIDs.remove.push(row.roleid);
		});
	});
	// whitelist_roles db -> config
	await sleep(1);
	let date = new Date().toISOString().slice(0,10);
	console.log("\x1b[2m[LOG]\x1b[0m \x1b[33mFetching data \x1b[0m[\x1b[32mDONE\x1b[0m]");
	if (!fs.existsSync(`${__dirname}/../config/backup`)) fs.mkdirSync(`${__dirname}/../config/backup`);
	if (!fs.existsSync(`${__dirname}/../config/backup/${date}`)) fs.mkdirSync(`${__dirname}/../config/backup/${date}`);
	Object.keys(configs).forEach(async config => {
		console.log(`\x1b[2m[LOG]\x1b[0m \x1b[33mBacking up ${config}.json \x1b[0m[\x1b[5m...\x1b[0m]`);
		copy(`${__dirname}/../config/${config}.json`,`${__dirname}/../config/backup/${date}/${config}.json`);
		await sleep(2);
		console.log(`\x1b[2m[LOG]\x1b[0m \x1b[33mBacking up ${config}.json \x1b[0m[\x1b[32mDONE\x1b[0m]`);
		console.log(`\x1b[2m[LOG]\x1b[0m \x1b[33mWriting data to ${config}.json \x1b[0m[\x1b[5m...\x1b[0m]`);
		fs.writeFile(`${__dirname}/../config/${config}.json`, JSON.stringify(configs[config]," ", 4),(err)=>{if (err) console.log(err)});
		console.log(`\x1b[2m[LOG]\x1b[0m \x1b[33mWriting data to ${config}.json \x1b[0m[\x1b[32mDONE\x1b[0m]`);
	});
	console.log(`\x1b[2m[LOG]\x1b[0m \x1b[33mSaving old files in \x1b[0m\x1b[4m${String(path.join(__dirname,"/../config/backup/", date))}\x1b[0m`);
})();