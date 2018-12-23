const Discord = require("discord.js");
const mysql = require("mysql");
const colors = require('colors/safe');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);


function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

module.exports.run = function (bot, message, args, prefix, db) {

    if (!args[0]) return message.channel.send('```md\n[Error] No map entered! ]:\n\n[Usage] : ' + prefix + 'mtop [map] ]:```');
    if (!args[0].toLowerCase().startsWith('surf_') || args[0].length < 6) return message.channel.send('```md\n[Error] Invalid map entered! ]:```');
    let map = args[0];

    db.query(`SELECT * FROM ck_playertimes WHERE mapname = '${map}' ORDER BY runtimepro ASC`, function (err, get) {
        if (err) console.log(err);
        if (String(get) == []) {
            db.query(`SELECT * FROM ck_maptier WHERE mapname = '${map}'`, function (err, get) {
                if (err) console.log(err);
                if (String(get) == []) return message.channel.send('```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```');
                return message.channel.send('```md\n[Error] <' + map + '> wasn\'t finished yet! ]:```');
            });
            return;
        }
        let runtime = get[0].runtimepro; //timestuff
        let minutes = runtime / 60; //minutes define
        minutes = minutes % 60; //minutes define
        let seconds = Math.round(runtime); //seconds define
        seconds = runtime % 60; //seconds define
        let milli = Math.round(runtime * 100); //ms define
        milli = milli % 100; //ms define
        minutes = Math.floor(minutes); //minutes define
        seconds = Math.floor(seconds); //seconds define
        minutes = checkTime(minutes); //minutes force to two-digit
        seconds = checkTime(seconds); //seconds force to two-digit
        milli = checkTime(milli); //milli force to two-digit
        let id = get[0].steamid;
        steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
            return message.channel.send('```md\n# Map Record: Normal #\n\n[' + summary.nickname + '] holds the record on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + ":" + milli + ' > ! ]:```');
        });
    });


};

module.exports.help = {
    name: "mtop"
};