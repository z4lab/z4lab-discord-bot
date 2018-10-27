const Discord = require("discord.js");
const mysql = require("mysql");
const SteamUser = require('steam-user');
const colors = require('colors/safe');
const SteamID = require('steamid');
const steam = require('steamidconvert')();
const SteamAPI = require('steamapi');
const steamapi = new SteamAPI('688114CD714F714C3F0588B0E5BAF82A');

module.exports.run = async (bot, message, args, prefix, db, clientsteam) => {

    message.delete();
    //return;
    //!profile 76561198235937094

    if (!args[0]) return message.channel.send('```md\n[Error] No SteamID entered! ]:\n\n[Usage] : ' + prefix + 'profile [steam64ID] ]:```');
    if (args[0].length != 17) return message.channel.send('```md\n[Error] The entered ID is not valid! ]:```');
    var id = String(args[0]);
    if (id.isValid) return message.channel.send('```md\n[Error] The entered ID is not valid! ]:```');
    db.query(`SELECT * FROM ck_playerrank WHERE steamid64 = ${id} AND style = 0`, function (err, get) {
        //console.log(get);
        //console.log(lastseen);
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
        db.query(`SELECT * FROM ck_playerrank WHERE style = 0 ORDER BY points DESC`, function (err, get) {
            for (var i = 0; i < get.length; i++){
                if (get[i].steamid == sid) var rank = i+1;
            }
            steamapi.getUserSummary(id).then(summary => {
                let embed = new Discord.RichEmbed()
                    .setAuthor(summary.nickname, '', summary.url)
                    .setThumbnail(summary.avatar.large)
                    .addField('Country: ', country, true)
                    .addField('Rank: ', `${rank}/${i}`, true)
                    .addField('Points: ', points, true)
                    .addField('Connections: ', connections, true)
                    .addField('Map Records: ', `${wrs}/${finishedmaps}`, true)
                    .addField('Bonus Records: ', `${wrbs}/${finishedbonuses}`, true)
                    .addField('Stage Records: ', `${wrcps}/${finishedstages}`, true);

                return message.channel.send(embed);
            });
        });
    });
};

module.exports.help = {
    name: "profile"
};