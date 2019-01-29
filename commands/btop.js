const { RichEmbed } = require('discord.js');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);
const fixTime = require("../util/fixTime.js");


module.exports.run = function (bot, message, args, prefix, db){
    return; //currently disabled until next bigger update
    if (!args[0]) {
        let embed = new RichEmbed()
            .setTitle('z4lab Discord Bot btop usage')
            .setThumbnail(bot.user.avatarURL)
            .addField(`${prefix}btop [bonus] [mapname] [BEGINNER/pro]`, '└ Shows bonusrecord for the given server/bonus', false);
            //.addField(`${prefix}btop [bonus] [mapname] [username] [BEGINNER/pro]`, '└ Shows player bonusrecord for the given user/bonus/server', false);
        return message.channel.send(embed);
    }
    if (!args[0]) return message.channel.send('```md\n[Error] No bonus number entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');
    if (String(Number(args[0])) === 'NaN') return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (Number(args[0]) < 1) return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (Number(args[0]) > 12) return message.channel.send('```md\n[Error] Enter a valid bonus number! ]:```');
    if (!args[1]) return message.channel.send('```md\n[Error] No map entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');
    if (!args[1].toLowerCase().startsWith('surf_')) return message.channel.send('```md\n[Error] Invalid map entered! ]:\n\n[Usage] : ' + prefix + 'btop [bonus] [map] ]:```');


    let bonus = args[0];
    let map = args[1];
    db.query(`SELECT * FROM ck_bonus WHERE mapname = '${map}' AND zonegroup = '${bonus}' ORDER BY runtime ASC`, function (err, get) {
        if (err) console.log(err);
        if (String(get) == []) {
            db.query(`SELECT * FROM ck_maptier WHERE mapname = '${map}'`, function (err, get) {
                if (err) console.log(err);
                if (String(get) == []) return message.channel.send('```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```');
                return message.channel.send('```md\n[Error] The bonus < ' + bonus + ' > on <' + map + '> is none existent or wasn\'t finished yet! ]:```');
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
        steamapi.getUserSummary(steam.convertTo64(id)).then(summary => {
            return message.channel.send('```md\n# Bonus Record: Normal #\n\n[' + summary.nickname + '] holds the bonus ' + get[0].zonegroup + ' record on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + ":" + milli + ' > ! ]:```');
        });
    });
};

module.exports.help = {
    name: "btop"
};