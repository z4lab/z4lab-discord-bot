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
            'If you want me to answer that question, you might want to do something better.',
            'Je ne parle pas anglais, mais je ne réponds toujours pas à la question.'
        ];

        let random = Math.floor(Math.random() * messageArray.length);

        return message.channel.send(messageArray[random]);
    }

    if (!args[0]) return message.channel.send('Add embed here - help if no args given!');

    if (args[0] == 'add') {
        //add command
        if (!args[1]) return message.channel.send('Enter a valid steamID');

        let sid = args[1].replace('_1', '_0') || args[1];

        if (!args[1].startsWith('STEAM_') || !new SteamID(sid).isValid()) return message.channel.send('Enter a valid steamID');


        args[1] = args[1].replace('_0', '_1');

            
            //INSERT INTO `z4labtest`.`mysql_whitelist` (`steamid`) VALUES ('STEAM_1:0:27661072');
            db_whitelist.query("INSERT INTO `" + db.whitelist.database + "`.`mysql_whitelist` (`steamid`) VALUES ('" + args[1] + "');", function (err) {
                
                if (err && err.code != 'ER_DUP_ENTRY') return message.channel.send('An error has occurred while whitelisting the ID!').then(console.log(err));

                if (err && err.code == 'ER_DUP_ENTRY') return message.channel.send('The ID is already whitelisted!');

                return message.channel.send('The ID was successfully whitelisted!');

            });


    } else if (args[0] == 'rm' || args[0] == 'remove') {
        //remove command
        if (!args[1]) return message.channel.send('Enter a valid steamID');

        let sid = args[1].replace('_0', '_1') || args[1];
        db_whitelist.query(`SELECT * FROM mysql_whitelist`, function (err, get) {

            for(var i = 0; i < get.length; i++) {
                if (get[i].steamid == sid) {
                    //DELETE FROM `z4labtest`.`mysql_whitelist` WHERE (`steamid` = 'STEAM_1:0:27661073');
                    db_whitelist.query("DELETE FROM `" + db.whitelist.database + "`.`mysql_whitelist` WHERE (`steamid` = '" + sid + "');", function (err) {
        
                        if (err) console.log(err);
        
                        return message.channel.send('The ID was successfully removed from the whitelist!');

                    });
                } else {
                    if (i == get.length - 1) return message.channel.send('The ID insn\'t on the whitelist!');
                }
            }
        });

    } else return message.channel.send('Add embed here - help if false args given!');

    //mysql_whitelist -> steamid -> STEAM_1:0:27661072 (steamid needs STEAM_1 !!!)




};

module.exports.help = {
    name: "whitelist"
};