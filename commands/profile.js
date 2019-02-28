const { RichEmbed } = require("discord.js");
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro) {

    if (!args[0]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + prefix + 'profile [Name] ]:```');
    var name = args[0];
    if (!args[1]) args[1] = 'beginner';
    if (args[1] != 'pro') args[1] = 'beginner';
    if (args[1] === 'beginner') {
        db_beginner.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, function (err, get) {
            if (err) return console.log(String(err));
            if (!get[0]) return message.channel.send('```md\n[Error] The user wasn\'t found in the database! ]:```');
            let country = get[0].country;
            let points = get[0].points;
            let connections = get[0].connections;
            let wrpoints = get[0].wrpoints;
            let wrbpoints = get[0].wrpoints;
            let wrcppoints = get[0].wrcppoints;
            let finishedmaps = get[0].finishedmaps;
            let finishedbonuses = get[0].finishedbonuses;
            let finishedstages = get[0].finishedstages;
            let wrs = get[0].wrs;
            let wrbs = get[0].wrbs;
            let wrcps = get[0].wrcps;
            let sid = get[0].steamid;
            db_beginner.query(`SELECT * FROM ck_playerrank WHERE style = '0' ORDER BY points DESC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == sid) var rank = i + 1;
                }
                steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {
                    let embed = new RichEmbed()
                        .setAuthor(summary.nickname + ' on our Surf Server', '', summary.url)
                        .setThumbnail(summary.avatar.large)
                        .addField('Country ', country, true)
                        .addField('Rank ', `${rank}/${i}`, true)
                        .addField('Points ', points, true)
                        .addField('Finished Maps ', `${finishedmaps}`, true);

                    return message.channel.send(embed);
                });
            });
        });
    } else {
        db_pro.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, function (err, get) {
            if (err) return console.log(String(err));
            if (!get[0]) return message.channel.send('```md\n[Error] The user wasn\'t found in the database! ]:```');
            let country = get[0].country;
            let points = get[0].points;
            let connections = get[0].connections;
            let wrpoints = get[0].wrpoints;
            let wrbpoints = get[0].wrpoints;
            let wrcppoints = get[0].wrcppoints;
            let finishedmaps = get[0].finishedmaps;
            let finishedbonuses = get[0].finishedbonuses;
            let finishedstages = get[0].finishedstages;
            let wrs = get[0].wrs;
            let wrbs = get[0].wrbs;
            let wrcps = get[0].wrcps;
            let sid = get[0].steamid;
            db_pro.query(`SELECT * FROM ck_playerrank WHERE style = '0' ORDER BY points DESC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steamid == sid) var rank = i + 1;
                }
                steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {
                    let embed = new RichEmbed()
                        .setAuthor(summary.nickname + ' on our Surf Pro Server', '', summary.url)
                        .setThumbnail(summary.avatar.large)
                        .addField('Country ', country, true)
                        .addField('Rank ', `${rank}/${i}`, true)
                        .addField('Points ', points, true)
                        .addField('Finished Maps ', `${finishedmaps}`, true);

                    return message.channel.send(embed);
                });
            });
        });
    }

};

module.exports.help = {
    name: "profile"
};