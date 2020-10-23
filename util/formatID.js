const steamapi = new global.bot.modules.core.steam.api(global.bot.config.main.steam["api-key"]);

module.exports = async function (input = false) {

	if (!input) return false;

	var id = await steamapi.resolve("'"+String(input)+"'");
	if (id) input = id; 

	input = global.bot.modules.core.steam.idconvert.convertToText(input);

	input = input.replace('_0', '_1');


	return input;

};