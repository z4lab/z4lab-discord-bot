const { RichEmbed } = require("discord.js");
const toTime = require("../util/toTime.js");

module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro, db_arena) {

    let commandlist = ["top3", "top5", "profile"];

    if (!args[0] && !commandlist.includes(args[0])) {
        //arena help embed

        let embed = new RichEmbed()
            .setTitle('z4lab Discord Bot arena usage')
            .setThumbnail(bot.user.avatarURL)
            .addField(`${prefix}arena top3 `, '└ Shows top 3 players in the 1v1 server', false)
            .addField(`${prefix}arena top5`, '└ Shows top 5 players in the 1v1 server', false)
            .addField(`${prefix}arena profile [name]`, '└ Shows the player stats', false);

        return message.channel.send(embed);
    }
    if (args[0] == 'top3' || args[0] == 'top5') {

        let count = args[0].substr(3, 1);

        db_arena.query(`SELECT * FROM rankme ORDER BY score DESC LIMIT ${count}`, function (err, get) {

            if (err) return console.log(err);

            //vars

            var users = [];

            get.forEach(user => {
                users.push({
                    sid: user.steam,
                    name: user.name,
                    score: user.score,
                    kills: user.kills,
                    deaths: user.deaths,
                    kd: Math.round(Number(user.kills) / Number(user.deaths) * 100) / 100,
                    shots: user.shots,
                    hits: user.hits,
                    accuracy: Math.round(Number(user.hits) / Number(user.shots) * 100 * 100) / 100 + '%',
                    headshots: user.headshots,
                    headshot: Math.round(Number(user.headshots) / Number(user.kills) * 100 * 100) / 100 + '%',
                });
            });

            var embed = new RichEmbed();
            embed.setTitle(`z4lab Arena Top${count}`);
            embed.setThumbnail(bot.user.avatarURL);

            let top = 1;

            users.forEach(user => {
                embed.addField('[' + top + '] ' + user.name, user.sid, true);
                embed.addField('Kills/Deaths', user.kills + '/' + user.deaths + ' (' + user.kd + ')', true);
                embed.addField('Shots/Hits', user.shots + '/' + user.hits + ' (' + user.accuracy + ')', true);
                embed.addField('Kills/Headshots', user.kills + '/' + user.headshots + ' (' + user.headshot + ')', true);
                if (top != count) embed.addBlankField(false);
                top++;
            });

            return message.channel.send(embed);
        });
    }
    if (args[0] == 'profile') {
        if (!args[1]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + prefix + 'arena profile [Name] ]:```');
        db_arena.query(`SELECT * FROM rankme WHERE name LIKE '%${args[1]}%' ORDER BY score DESC LIMIT 1`, function (err, get) {
            if (err) return console.log(err);
            if (!get[0]) return message.channel.send('```md\n[Error] The user wasn\'t found in the database! ]:```');
            let user = [];
            user.push({
                sid: get [0].steam,
                name: get [0].name,
                score: get [0].score,
                kills: get [0].kills,
                deaths: get [0].deaths,
                kd: Math.round(Number(get[0].kills) / Number(get[0].deaths) * 100) / 100,
                shots: get [0].shots,
                hits: get [0].hits,
                accuracy: Math.round(Number(get[0].hits) / Number(get[0].shots) * 100 * 100) / 100 + '%',
                headshots: get [0].headshots,
                headshot: Math.round(Number(get[0].headshots) / Number(get[0].kills) * 100 * 100) / 100 + '%',
                lastconnect: toTime(get[0].lastconnect),
                lastconnectDate: new Date(get[0].lastconnect * 1000),
            });


            var sid = user[0].sid;
            var rank = 0;
            db_arena.query(`SELECT * FROM rankme ORDER BY score DESC`, function (err, get) {
                for (var i = 0; i < get.length; i++) {
                    if (get[i].steam == sid) rank = i + 1;
                }

                var embed = new RichEmbed()
                    .setTitle(`z4lab Arena Profile`)
                    .setThumbnail(bot.user.avatarURL)
                    .addField('[' + rank + '] ' + user[0].name, user[0].sid, true)
                    .addField('Kills/Deaths', user[0].kills + '/' + user[0].deaths + ' (' + user[0].kd + ')', true)
                    .addField('Shots/Hits', user[0].shots + '/' + user[0].hits + ' (' + user[0].accuracy + ')', true)
                    .addField('Kills/Headshots', user[0].kills + '/' + user[0].headshots + ' (' + user[0].headshot + ')', true)
                    .addField('Last Connect', user[0].lastconnect);

                return message.channel.send(embed);
            });
        });
    }
    if (args[0] == 'weaponstats') {
        if (!args[1]) return message.channel.send('```md\n[Error] No Name entered! ]:\n\n[Usage] : ' + prefix + 'arena weaponstats [Name] ]:```');
        db_arena.query(`SELECT * FROM rankme WHERE name LIKE '%${args[1]}%' ORDER BY score DESC LIMIT 1`, function (err, get) {
            if (err) return console.log(err);
            if (!get[0]) return message.channel.send('```md\n[Error] The user wasn\'t found in the database! ]:```');
            let user = [];
            user.push({
                sid: get [0].steam,
                name: get [0].name,
                kills: get [0].kills,
                usp: get [0].usp_silencer,
                deagle: get [0].deagle,
                ak: get [0].ak47,
                m4a1: get [0].m4a1,
                m4a1_silencer: get [0].m4a1_silencer,
            });
            let embed = new RichEmbed()
                .setTitle(`z4lab Arena Weaponstats :`)
                .setThumbnail(bot.user.avatarURL)
                .addField(user[0].name, user[0].sid, true)
                .addBlankField(true)
                .addField('AK47 Kills:', `${user[0].ak}/${user[0].kills} (${Math.round((100*user[0].ak/user[0].kills) * 100) / 100}%)`);
            
            return message.channel.send(embed);
            /*
            let page = 1;
            let pages = [{
                title: user[0].name,
                content: user[0].sid,
            }, {
                title: 'AK47 Kills:',
                content: `${user[0].ak}/${user[0].kills} (${Math.round((100*user[0].ak/user[0].kills) * 100) / 100}%)`
            }];

            let embed = new RichEmbed()
                .setTitle(`z4lab Arena Weaponstats :`)
                .setThumbnail(bot.user.avatarURL)
                .addField(user[0].name, user[0].sid, true)
                .setFooter(`Page ${page} of ${pages.length}`);
            var oldmsg = message;
            return message.channel.send(embed).then(msg => {
                let embed = new RichEmbed();
                msg.react('\👈').then(r => {
                    msg.react('\👉').then(r => {
                        msg.react('\❌');
                    });

                    const bwFilter = (reaction, user) => reaction.emoji.name === '👈' && user.id != bot.user.id;
                    const fwFilter = (reaction, user) => reaction.emoji.name === '👉' && user.id != bot.user.id;
                    const rmFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id != bot.user.id;

                    const bw = msg.createReactionCollector(bwFilter);
                    const fw = msg.createReactionCollector(fwFilter);
                    const rm = msg.createReactionCollector(rmFilter);

                    bw.on('collect', r => {
                        if (page === 1) return;
                        page--;
                        embed.setTitle('z4lab-Bot Testing :')
                            .setThumbnail(bot.user.avatarURL)
                            .addField(pages[page - 1].title, pages[page - 1].content, false)
                            .setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(embed);
                        embed = new RichEmbed();
                    });

                    fw.on('collect', r => {
                        if (page === pages.length) return;
                        page++;
                        embed.setTitle('z4lab-Bot Testing :')
                            .setThumbnail(bot.user.avatarURL)
                            .addField(pages[page - 1].title, pages[page - 1].content, false)
                            .setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(embed);
                        embed = new RichEmbed();
                    });

                    rm.on('collect', r => {
                        oldmsg.delete();
                        msg.delete();
                    });

                });
            });*/
        });
    }

};





module.exports.help = {
    name: "arena"
};