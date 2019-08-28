const steam = require('steamidconvert')();
const SteamID = require('steamid');
const config = require("../config/bot.json");
const SteamAPI = require('steamapi');
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports = async function (input = false) {

    if (!input) return false;

    try {
        var id = await steamapi.resolve("'"+String(input)+"'");
        if (id) input = id; 
    } catch (e) {
        throw (e);
    }

    input = steam.convertToText(input);

    input = input.replace('_0', '_1');

    console.log(input);

    return input;

};