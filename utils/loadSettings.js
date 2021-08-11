module.exports = () => {

	const Bot = require(process.cwd());

	var _continue = () => {

		let settings = { private: {}, public: {} }, fetchedSettings = { private: {}, public: {} };
		let fetchSettings = Bot.DB.SQLite.Main.prepare("SELECT setting, value FROM settings WHERE private = ?");

		fetchSettings.all("0").forEach(t => { settings.public[t.setting] ? (Array.isArray(settings.public[t.setting]) || (settings.public[t.setting] = [settings.public[t.setting]]), settings.public[t.setting].push(t.value)) : settings.public[t.setting] = t.value });
		fetchSettings.all("1").forEach(t => { settings.private[t.setting] ? (Array.isArray(settings.private[t.setting]) || (settings.private[t.setting] = [settings.private[t.setting]]), settings.private[t.setting].push(t.value)) : settings.private[t.setting] = t.value });

		/**
		 * one layer ":" objects stored in sqlite discord:token >> discord: {token: value}} in js form :)
		 * */
		Object.keys(settings).forEach(t => { Object.keys(settings[t]).forEach(e => { e.split(":").length > 1 && (fetchedSettings[t][e.split(":")[0]] || (fetchedSettings[t][e.split(":")[0]] = {}), fetchedSettings[t][e.split(":")[0]][e.split(":")[1]] = settings[t][e]) }) });

		// fix for numberic values :/
		fetchedSettings.public.activity.type = Number(fetchedSettings.public.activity.type);

		Bot.emit("settingsFetched", fetchedSettings);

	}


	try {
		Bot.DB.SQLite.Main.exec("CREATE TABLE IF NOT EXISTS settings ( setting VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, private INTEGER NOT NULL DEFAULT 0 )");
		Bot.Logger.info("SQLite3 Main", "Initialized database settings!");
		_continue();
	} catch (e) {
		Bot.Logger.error("SQLite3 Main", "Initializing database settings failed!");
		console.error(e);
		process.exit();
	}

}