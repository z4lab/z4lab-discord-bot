const { bot, config } = require('../index');
const colors = require('colors/safe');
const timestamp = require('../util/timeStamp');

bot.on('ready', () => {
    console.log('');
    console.log(timestamp() + colors.green('[Discord] Connected!'));
    console.log(timestamp() + colors.grey(`[Discord] ${bot.user.tag} started!`));
    console.log('');
    let botUser = bot.guilds.first().members.get(bot.user.id);
    if (bot.config.main.version.inName == true) {
        botUser.edit({
            nick: bot.user.username + ` [${bot.config.main.version.version}]`
        });
    } else {
        botUser.edit({
            nick: bot.user.username
        });
    }
    let presence = bot.config.main.presence;
    presence.game.name += ` ${bot.config.main.prefix}help`;
    bot.user.setPresence(presence);
    bot.setInterval(() => {
        bot.user.setStatus('idle'); 
    }, 5 * 1000); 
    
});
