const { RichEmbed } = require('discord.js');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);
const fixTime = require("../util/fixTime.js");


module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro) {

    if (!args[0]) {
        let embed = new RichEmbed()
            .setTitle('z4lab Discord Bot mtop usage')
            .setThumbnail(bot.user.avatarURL)
            .addField(`${prefix}mtop [mapname] [BEGINNER/pro]`, '└ Shows maprecord for the given server', false)
            .addField(`${prefix}mtop [mapname] [username] [BEGINNER/pro]`, '└ Shows playerrecord for the given user/server', false);
        return message.channel.send(embed);
    }
    if (!args[0].toLowerCase().startsWith('surf_') || args[0].length < 6) return message.channel.send('```md\n[Error] Invalid map entered! ]:```');
    let map = args[0];
    var name = 'AND 1=1';
    if (args[1] && args[1].toLowerCase() != 'pro' && args[1].toLowerCase() != 'beginner') name = "AND name LIKE '%" + String(args[1]) + "%'";
    if (args[1] == 'pro') args[2] = 'pro';
    if (!args[2]) args[2] = 'beginner';
    if (args[2] != 'pro') args[2] = 'beginner';
    if (args[2] == 'beginner') {
        db_beginner.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
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

            let ms = get[0].runtimepro * 1000;
            let round = ms > 0 ? Math.floor : Math.ceil;
            let minutes = fixTime(round(ms / 60000) % 60);
            let seconds = fixTime(round(ms / 1000) % 60);
            let milli = round(ms) % 1000;
            if (milli.length > '2') milli = fixTime(milli.slice(0, -1));
            else milli = fixTime(milli);
            let id = get[0].steamid;
            db_beginner.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == id) var rank = i + 1;
                }
                var record = 'Map';
                var record2 = 'the record';
                if (name != 'AND 1=1') {
                    record = 'Player';
                    record2 = 'his personal record';
                }
                steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
                    return message.channel.send('```md\n# ' + record + ' Record @ Beginner Server #\n\n[' + summary.nickname + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + "." + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```');
                });
            });
        });
    } else {
        db_pro.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
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
            let ms = get[0].runtimepro * 1000;
            let round = ms > 0 ? Math.floor : Math.ceil;
            let minutes = fixTime(round(ms / 60000) % 60);
            let seconds = fixTime(round(ms / 1000) % 60);
            let milli = round(ms) % 1000;
            if (milli.length > '2') milli = fixTime(milli.slice(0, -1));
            else milli = fixTime(milli);
            let id = get[0].steamid;
            db_pro.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == id) var rank = i + 1;
                }
                var record = 'Map';
                var record2 = 'the record';
                if (name != 'AND 1=1') {
                    record = 'Player';
                    record2 = 'his personal record';
                }
                steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
                    return message.channel.send('```md\n# ' + record + ' Record @ Pro Server #\n\n[' + summary.nickname + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + "." + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```');
                });
            });
        });
    }


};

module.exports.help = {
    name: "mtop"
};