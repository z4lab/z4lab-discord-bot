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


module.exports.run = async (bot, message, args, prefix, db) => {

    if (!args[0]) return message.channel.send('```md\n[Error] No bonus number entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');
    if (String(Number(args[0])) === 'NaN') return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (Number(args[0]) < 1) return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (Number(args[0]) > 12) return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (!args[1]) return message.channel.send('```md\n[Error] No map entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');
    if (!args[1].toLowerCase().startsWith('surf_')) return message.channel.send('```md\n[Error] Invalid map entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');


    let bonus = args[0];
    let map = args[1];
    db.query(`SELECT * FROM ck_bonus WHERE mapname = '${map}' AND style = 0 AND zonegroup = '${bonus}' ORDER BY runtime ASC`, function (err, get) {
        if (err) console.log(err);
        if (String(get) == []) {
            db.query(`SELECT * FROM ck_maptier WHERE mapname = '${map}'`, function (err, get) {
                if (err) console.log(err);
                if (String(get) == []) return message.channel.send('```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```');
                return message.channel.send('```md\n[Error] The bonus < ' + bonus + ' > on <' + map + '> is none existent or wasn\'t finished yet! ]:```');
            });
            return;
        }

        let runtime = get[0].runtime; //timestuff
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
            return message.channel.send('```md\n# Bonus Record: Normal #\n\n[' + summary.nickname + '] holds the bonus ' + get[0].zonegroup + ' record on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + ":" + milli + ' > ! ]:```');
        });
    });
};

module.exports.help = {
    name: "btop"
};