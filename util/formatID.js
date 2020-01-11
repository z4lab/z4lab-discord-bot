const steamapi = new global.bot.modules.core.steam.api(global.bot.config.main.steam["api-key"]);

module.exports = async function (input = false) {

    if (!input) return false;

    try {
        var id = await steamapi.resolve("'"+String(input)+"'");
        if (id) input = id; 
    } catch (e) {
        throw (e);
    }

    input = global.bot.modules.core.steam.idconvert.convertToText(input);

    input = input.replace('_0', '_1');


    return input;

};