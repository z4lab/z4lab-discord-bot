const Discord = require("discord.js");
const mysql = require("mysql");

function checkTime(i) {
    if (i < 10) {
        return i = '0' + i;
    }
    return i;
}

module.exports.run = async (bot, message, args, prefix, db, clientsteam) => {
    var map = [];
    var msg = "";
    var number = "";
    if (!args[0]) {
        number = '5';
    } else {
        if (Number(args[0]) < 1) {return message.channel.send('```md\n[Error] Invalid map amount! ]:\n\n[Usage] : ' + prefix + 'nm [mapcount {1-10}] ]:```');}
        if (Number(args[0]) > 10) {return message.channel.send('```md\n[Error] Invalid map amount! ]:\n\n[Usage] : ' + prefix + 'nm [mapcount {1-10}] ]:```');}
        number = args[0];
        if (String(Number(args[0])) === 'NaN') {
            number = '5';
        }
    }
    db.query(`SELECT * FROM ck_newmaps ORDER BY date DESC`, function (err, get) {
        if (Number(get.length) < number) {
            message.channel.send('```md\n[Error] Not enough maps in the database! Showing '+get.length+' maps.]:```');
            number = get.length;
        }
        for (var i = 0; i < number; i++) {
            get[i].date = new Date(get[i].date)
            map.push({
                name: get[i].mapname,
                tier: get[i].tier,
                staged: get[i].staged,
                date: {
                    day: checkTime(get[i].date.getDate()),
                    month: checkTime(get[i].date.getMonth()),
                    year: get[i].date.getFullYear(),
                    hours: checkTime(get[i].date.getHours()),
                    minutes: checkTime(get[i].date.getMinutes()),
                    seconds: checkTime(get[i].date.getSeconds())
                }
            });
            if (map[i].staged == '1') map[i].staged = 'S';
            else map[i].staged = 'L';
            msg += '\n[' + map[i].name + '] <T' + map[i].tier + ' ' + map[i].staged + '> since ' + map[i].date.day + '.' + map[i].date.month + '.' + map[i].date.year + ' @ ' + map[i].date.hours + ':' + map[i].date.minutes + ':' + map[i].date.seconds + ' ]:';
        }
        return message.channel.send('```md\n# Newmaps #\n' + msg + '```');
    });

};

module.exports.help = {
    name: "nm"
};