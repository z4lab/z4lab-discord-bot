const { RichEmbed } = require("discord.js");
const toDuration = require('humanize-duration');
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro) {

    if (!args[0]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + prefix + 'nolife [Name] ]:```');
    let name = args[0];

    db_beginner.query(`SELECT * FROM ck_playerrank WHERE name LIKE '%${name}%' AND style = '0' ORDER BY points DESC`, function (err, get) {
        if (err) return console.log(String(err));
        if (!get[0]) return message.channel.send('```md\n[Error] The user wasn\'t found in the database! ]:```');
        let lastseen = get[0].lastseen;
        let firstseen = get[0].joined;
        let timealive = get[0].timealive;
        let timespec = get[0].timespec;
        let timeonline = timealive + timespec;
        let _timealive = toDuration(timealive*1000, { units: ['mo', 'w', 'd', 'h', 'm'], round: true });
        let _timespec = toDuration(timespec*1000, { units: ['mo', 'w', 'd', 'h', 'm'], round: true });
        let _timeonline = toDuration(timeonline*1000, { units: ['mo', 'w', 'd', 'h', 'm'], round: true });
        steamapi.getUserSummary(String(get[0].steamid64)).then(summary => {
            let embed = new RichEmbed()
                .setAuthor(summary.nickname + ' on our Surf Server', '', summary.url)
                .setThumbnail(summary.avatar.large)
                .addField('Total time online', _timeonline, false)
                .addField('Time playing', _timealive, true)
                .addField('Time specating', _timespec, true)
                .setTimestamp(new Date(lastseen*1000))
                .setFooter(`last seen`);

            return message.channel.send(embed);
        });
    });
};

module.exports.help = {
    name: "nolife"
};