const { bot, config } = require('../index');
const colors = require('colors/safe');
const timestamp = require('../util/timeStamp');

bot.on('ready', () => {
    console.log('');
    console.log(timestamp() + colors.green('[Discord] Connected!'));
    console.log(timestamp() + colors.grey(`[Discord] ${bot.user.tag} started!`));
    console.log('');
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
    //let presence = config.presence;
    //presence.game.name += ` ${config.prefix}help`;
    //bot.user.setPresence(presence);
    bot.setInterval(() => {
        let Status = [
            `by Ace`,
            `z4lab dev Bot`,
        ];
    
        bot.user.setActivity(Status[Math.floor(Math.random() * Status.length)], { "type": "WATCHING" }); 
        // Change PLAYING to what you want: https://discord.js.org/#/docs/main/stable/typedef/ActivityType
        bot.user.setStatus('idle'); 
        // Change online to what you want: https://discord.js.org/#/docs/main/stable/typedef/PresenceStatus 
    }, 5 * 1000); 
        // Change 30 to whatever amount of seconds you would prefer
    
});