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
module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro) {

    if (!args[0]) return message.channel.send('```md\n[Error] No map entered! ]:\n\n[Usage] : ' + prefix + 'mtop [map] ]:```');
    if (!args[0].toLowerCase().startsWith('surf_') || args[0].length < 6) return message.channel.send('```md\n[Error] Invalid map entered! ]:```');
    let map = args[0];
    var name = 'AND 1=1';
    if (args[1] && args[1].toLowerCase() != 'pro' && args[1].toLowerCase() != 'beginner') name = "AND name LIKE '%" + String(args[1]) + "%'";
    if (args[1] == 'pro') args[2] = 'pro';
    if (!args[2]) args[2] = 'beginner';
    if (args[2] != 'pro') args[2] = 'beginner';
    if (args[2] == 'beginner') {
        db_beginner.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} ORDER BY runtimepro ASC`, function (err, get) {
            if (err) console.log(err);
            if (String(get) != []) map = get[0].mapname;
            if (String(get) == []) {
                db_beginner.query(`SELECT * FROM ck_maptier WHERE mapname LIKE '%${map}%'`, function (err, get) {
                    if (err) console.log(err);
                    if (String(get) == []) return message.channel.send('```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```');
                    if (name != 'AND 1=1') return message.channel.send('```md\n[Error] The player hasn\'t finished <' + get[0].mapname + '> yet! ]:```');
                    return message.channel.send('```md\n[Error] <' + get[0].mapname + '> wasn\'t finished yet! ]:```');
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
            db_beginner.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' ORDER BY runtimepro ASC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == id) var rank = i + 1;
                }
                var record = 'Map';
                var record2 = 'the record';
                if (name != 'AND 1=1') {
                    record = 'Player';
                    record2 = 'his personal';
                }
                steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
                    return message.channel.send('```md\n# ' + record + ' Record @ Beginner Server #\n\n[' + summary.nickname + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + ":" + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```');
                });
            });
        });
    } else {
        db_pro.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} ORDER BY runtimepro ASC`, function (err, get) {
            if (err) console.log(err);
            if (String(get) != []) map = get[0].mapname;
            if (String(get) == []) {
                db_pro.query(`SELECT * FROM ck_maptier WHERE mapname LIKE '%${map}%'`, function (err, get) {
                    if (err) console.log(err);
                    if (String(get) == []) return message.channel.send('```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```');
                    if (name != 'AND 1=1') return message.channel.send('```md\n[Error] The player hasn\'t finished <' + get[0].mapname + '> yet! ]:```');
                    return message.channel.send('```md\n[Error] <' + get[0].mapname + '> wasn\'t finished yet! ]:```');
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
            db_pro.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' ORDER BY runtimepro ASC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == id) var rank = i + 1;
                }
                var record = 'Map';
                var record2 = 'the record';
                if (name != 'AND 1=1') {
                    record = 'Player';
                    record2 = 'his personal';
                }
                steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
                    return message.channel.send('```md\n# ' + record + ' Record @ Pro Server #\n\n[' + summary.nickname + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + ":" + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```');
                });
            });
        });
    }


};

module.exports.help = {
    name: "mtop"
};