const { bot } = require('../index');
const colors = require('colors/safe');
const alias = require('../util/alias');
const getPermissionLvl = require('../util/permissionLvl');


bot.on('message', message => {

    var fChannelId = config.channels[0];

    if (message.author.id === bot.user.id) return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send(`Please use our <#${fChannelId}> channel`);

    if (!config.channels.includes(message.channel.id)) return;

    var permissionLvl = getPermissionLvl(message.member);

    var prefix = config.prefix;

    var messageArray = message.content.split(" ");
    var cmd = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    cmd = alias(cmd.slice(prefix.length));
    
    var commandFile = bot.commands.get(cmd);

    if (commandFile && permissionLvl >= commandFile.help.permissionLvl) commandFile.run(bot, message, args);    
    else if (commandFile && permissionLvl < commandFile.help.permissionLvl) return message.reply("you don't have enough permission to use this command!");
    else return;

});