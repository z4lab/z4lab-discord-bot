global.bot.on('guildMemberAdd', member => {

    addMember(member);
    logMember(member);
    memberCount(member);

    function addMember(member) {
        let role = member.guild.roles.find(role => role.name == 'Member'); //looks for the Member role
        member.addRole(role); //add the Member role to the user
    }
    
    
    function logMember(member) {
    
        let channelID = global.bot.config.channels.log.channelID;
        let channel = member.guild.channels.find(channel => channel.id == channelID);
        let emoji = global.bot.emojis.find(emoji => emoji.name == 'userJoined');
    
        let username = member.user.tag;
        let userID = member.user.id;
    
        channel.send(emoji + ' New User\n' + username + ' ( ' + String(member) + ' ) joined the sanctuary!');
    
    }
    
    function memberCount(member) {
    
        let channelID = global.bot.config.channels.memberCount.channelID;
        let channel = member.guild.channels.find(channel => channel.id == channelID);
        let guild = global.bot.guilds.first();
    
        channel.setName("[afk] - " + guild.memberCount + " members");
    
    }
});

