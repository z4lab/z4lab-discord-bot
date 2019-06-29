const { bot, config, db_arena, db_beginner, db_pro, db_whitelist } = require('../index');
const colors = require('colors/safe');
const alias = require('../util/alias');


bot.on('message', message => {

    var fChannelId = config.channels[0];

    if (message.author.id === bot.user.id) return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send(`Please use our <#${fChannelId}> channel`);

    if (!config.channels.includes(message.channel.id)) return;

    var prefix = config.prefix;

    var messageArray = message.content.split(" ");
    var cmd = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    cmd = alias(cmd.slice(prefix.length));
    
    var commandFile = bot.commands.get(cmd);
    
    if (commandFile) commandFile.run(bot, message, args, prefix, db_beginner, db_pro, db_arena, db_whitelist);    
    
});