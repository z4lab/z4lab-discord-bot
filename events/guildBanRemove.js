const { bot } = require('../index');
const channels = require('../config/channels.json');

 bot.on('guildBanRemove', (guild, user) => {
    logBan(guild, user);
});

 function logBan(guild, user) {

     let channelID = channels.log.channelID;
    let channel = guild.channels.find(channel => channel.id == channelID);
    let emoji = bot.emojis.find(emoji => emoji.name == 'unban');

     let username = user.tag;
    let userID = user.id;

     channel.send(emoji + ' Ban removed\n' + username + ' ( ' + String(user) + ' ) unbanned from the sanctuary!');

 } 