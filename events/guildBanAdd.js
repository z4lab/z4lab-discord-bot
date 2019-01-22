const { bot } = require('../index');
const channels = require('../config/channels.json');

bot.on('guildBanAdd', (guild, user) => {
    logBan(guild, user);
});

function logBan(guild, user) {

    let channelID = channels.log.channelID;
    let channel = guild.channels.find(channel => channel.id == channelID);
    let emoji = bot.emojis.find(emoji => emoji.name == 'ban');

    let username = user.tag;
    let userID = user.id;

    channel.send(emoji + ' Ban added\n' + username + ' ( ' + String(user) + ' ) banned from the sanctuary!');

}