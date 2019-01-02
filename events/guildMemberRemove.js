const { bot } = require('../index');
const channels = require('../config/channels.json');


bot.on('guildMemberRemove', member => {

    logMember(member);

    memberCount(member);

});



function logMember(member) {

    let channelID = channels.log.channelID;
    let channel = member.guild.channels.find(channel => channel.id == channelID);
    let emoji = bot.emojis.find(emoji => emoji.name == 'userLeft');

    let username = member.user.tag;
    let userID = member.user.id;

    channel.send(emoji + ' User Left\n<@' + userID + '> (`' + userID + '`) left the sanctuary!');

}

function memberCount(member) {

    let channelID = channels.memberCount.channelID;
    let channel = member.guild.channels.find(channel => channel.id == channelID);
    let guild = bot.guilds.first();

    channel.setName("Current Members : " + guild.memberCount);

}