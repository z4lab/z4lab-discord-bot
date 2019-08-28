const { RichEmbed } = require("discord.js");
const dbPost = require("../util/dbPost");
const dbRequest = require("../util/dbRequest");


module.exports.run = async function (bot, message, args) {

    let access = false;

    bot.config.whitelist.allowedIDs.add.forEach(role => {
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
        .addField(`${bot.config.main.prefix}whitelist add [STEAMID/STEAMID64/CUSTOM-URL]`, '└ Add a player to the whitelist', false)
        .addField(`${bot.config.main.prefix}whitelist rm/remove [STEAMID/STEAMID64/CUSTOM-URL]`, '└ Remove a player to the whitelist', false);


    if (!args[0]) return message.channel.send(usage);

    if (args[0] == 'add') {
        //add command
        if (!args[1]) return message.channel.send(usage);

        let result = await dbPost.whitelistAdd(bot.db.db_whitelist, args[1]);

        if (result.error) return message.channel.send(result.error.message);
        if (result.embed) return message.channel.send(result.embed);
        return;


    } else if (args[0] == 'rm' || args[0] == 'remove') {
        let del_access = false;
        bot.config.whitelist.allowedIDs.remove.forEach(role => {
            if (message.member.roles.has(role)) del_access = true;
        });

        if (!del_access) {

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
        //remove command
        if (!args[1]) return message.channel.send(usage);

        let result = await dbPost.whitelistRemove(bot.db.db_whitelist, args[1]);

        if (result.error) return message.channel.send(result.error.message);
        if (result.embed) return message.channel.send(result.embed);
        return;

    } else if (args[0] == "list" || args[0] == "ls") {

        let res = await dbRequest.getVipList(bot.db.db_whitelist);

        message.channel.send(res.list.string).catch(error => {
            return message.channel.send("```\n" + error + "```")
        });

    }
};

module.exports.help = {
    name: "whitelist",
    category: "main",
    usage: [{
        command: "add [STEAMID/STEAMID64/CUSTOM-URL]",
        description: "Add a player to the whitelist"
    }, {
        command: "rm/remove [STEAMID/STEAMID64/CUSTOM-URL]",
        description: "Remove a player to the whitelist"
    }],
    description: "add or remove a player on our VIP Surf Server's whitelist",
    permissionLvl: 1
};