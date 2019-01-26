const { RichEmbed } = require('discord.js');
const db = require('../config/dbs.json');
const whitelist = require('../config/whitelist.json');
const steam = require('steamidconvert')();
const SteamID = require('steamid');
const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);

module.exports.run = function (bot, message, args, prefix, db_beginner, db_pro, db_arena, db_whitelist) {

    let access = false;

    whitelist.allowedIDs.forEach(role => {
        if (message.member.roles.has(role)) access = true;
    });

    if (!access) {

        let messageArray = ['Failure is simply the opportunity to begin again, this time more intelligently.',
            'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.',
            'If two wrongs don\'t make a right, try three.',
            'I am not lazy, I am on energy saving mode.',
            'People say nothing is impossible, but I do nothing every day.',
            'The elevator to success is out of order. You’ll have to use the stairs.',
            'The answer you\'re looking for is inside of you, but it\'s wrong.',
            'If you think nobody cares if you\'re alive, try missing a couple of payments.',
            'I thought this would never happen, but you just don\'t care enough for me to give you an answer.',
            'If you want me to answer that question, you might want to do something better.'
        ];

        let random = Math.floor(Math.random() * messageArray.length);

        return message.channel.send(messageArray[random]);
    }

    var usage = new RichEmbed()
        .setTitle('z4lab Discord Bot whitelist usage')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${prefix}whitelist add [STEAMID]`, '└ Add a player to the whitelist', false)
        .addField(`${prefix}whitelist rm/remove [STEAMID]`, '└ Remove a player to the whitelist', false);


    if (!args[0]) return message.channel.send(usage);

    if (args[0] == 'add') {
        //add command
        if (!args[1]) return message.channel.send(usage);

        let sid = args[1].replace('_1', '_0') || args[1];

        if (!args[1].startsWith('STEAM_') || !new SteamID(sid).isValid()) return message.channel.send('```md\n[Error] Invalid SteamID entered! ]:```');


        args[1] = args[1].replace('_0', '_1');

            
            //INSERT INTO `z4labtest`.`mysql_whitelist` (`steamid`) VALUES ('STEAM_1:0:27661072');
            db_whitelist.query("INSERT INTO `" + db.whitelist.database + "`.`mysql_whitelist` (`steamid`) VALUES ('" + args[1] + "');", function (err) {
                
                if (err && err.code != 'ER_DUP_ENTRY') return message.channel.send('```md\n[Error] Failed to whitelist the ID! ]:```').then(console.log(err));

                if (err && err.code == 'ER_DUP_ENTRY') {

                    steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {

                        let embed = new RichEmbed()
                            .setTitle('z4lab Whitelist')
                            .setDescription('Player is already on the whitelist!')
                            .setThumbnail(summary.avatar.large)
                            .addField(`[*] ${summary.nickname}`, summary.url);

                        return message.channel.send(embed);

                    });
                    return;
                }

                steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {

                    let embed = new RichEmbed()
                        .setTitle('z4lab Whitelist')
                        .setDescription('Player successfully added to the whitelist!\nsteam://connect/94.130.8.161:27040')
                        .setThumbnail(summary.avatar.large)
                        .addField(`[+] ${summary.nickname}`, summary.url);

                    return message.channel.send(embed);

                });


            });


    } else if (args[0] == 'rm' || args[0] == 'remove') {
        //remove command
        if (!args[1]) return message.channel.send(usage);

        let sid = args[1].replace('_0', '_1') || args[1];
        db_whitelist.query(`SELECT * FROM mysql_whitelist`, function (err, get) {

            for(var i = 0; i < get.length; i++) {
                if (get[i].steamid == sid) {
                    //DELETE FROM `z4labtest`.`mysql_whitelist` WHERE (`steamid` = 'STEAM_1:0:27661073');
                    db_whitelist.query("DELETE FROM `" + db.whitelist.database + "`.`mysql_whitelist` WHERE (`steamid` = '" + sid + "');", function (err) {
        
                        if (err) console.log(err);
                        steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {

                            let embed = new RichEmbed()
                                .setTitle('z4lab Whitelist')
                                .setDescription('Player successfully removed from the whitelist!')
                                .setThumbnail(summary.avatar.large)
                                .addField(`[-] ${summary.nickname}`, summary.url);
        
                            return message.channel.send(embed);
        
                        });
                        return;
                    });
                } else {
                    if (i == get.length - 1) {
                        steamapi.getUserSummary(steam.convertTo64(String(sid))).then(summary => {

                            let embed = new RichEmbed()
                                .setTitle('z4lab Whitelist')
                                .setDescription('Player wasn\'t found on the whitelist!')
                                .setThumbnail(summary.avatar.large)
                                .addField(`[*] ${summary.nickname}`, summary.url);
        
                            return message.channel.send(embed);
        
                        });
                        return;
                    }
                }
            }
        });

    } else return message.channel.send(usage);

    //mysql_whitelist -> steamid -> STEAM_1:0:27661072 (steamid needs STEAM_1 !!!)




};

module.exports.help = {
    name: "whitelist"
};