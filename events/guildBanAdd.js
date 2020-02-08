global.bot.on('guildBanAdd', (guild, user) => {
    logBan(guild, user);
    
    function logBan(guild, user) {
    
        let channelID = global.bot.config.channels.log.channelID;
        let channel = guild.channels.find(channel => channel.id == channelID);
        let emoji = global.bot.emojis.find(emoji => emoji.name == 'ban');
    
        let username = user.tag;
    
        channel.send(emoji + ' Ban added\n' + username + ' ( ' + String(user) + ' ) banned from the sanctuary!');
    
    }
});