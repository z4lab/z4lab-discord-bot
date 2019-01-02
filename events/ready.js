const { bot } = require('../index');
const { config } = require('../index');
const colors = require('colors/safe');


bot.on('ready', () => {
    console.log('');
    console.log(colors.green('[Discord] Connected!'));
    console.log(colors.grey(`[Discord] ${bot.user.tag} started!`));
    let botUser = bot.guilds.first().members.get(bot.user.id);
    if (config.version.inName == true) {
        botUser.edit({
            nick: bot.user.username + ` [${config.version.version}]`
        });
    } else {
        botUser.edit({
            nick: bot.user.username
        });
    }
    config.presence.game.name += ` ${config.prefix}help`;
    bot.user.setPresence(config.presence);
});