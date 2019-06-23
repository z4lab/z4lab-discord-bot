const steam = require('steamidconvert')();
const SteamID = require('steamid');
const config = require("../config/bot.json");
const SteamAPI = require('steamapi');
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports = async function (input = false) {

    if (!input) return false;

    console.log(input);

    try {
        var id = await steamapi.resolve("'"+String(input)+"'");
        if (id) input = id; 
    } catch (e) {
        throw (e);
    }

    if (!input.startsWith('STEAM_') && input.length == '17') input = steam.convertToText(input);

    let sid = input.replace('_1', '_0') || input;

    if (!input.startsWith('STEAM_') || !new SteamID(sid).isValid()) return false;

    input = input.replace('_0', '_1');

    return input;

};