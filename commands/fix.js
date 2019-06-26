const channels = require('../config/channels.json');

module.exports.run = function (bot, message, args) {
    
    if (message.member.hasPermission("ADMINISTRATOR")) {

        var mC = message.guild.channels.find(channel => channel.id == channels.memberCount.channelID).name.includes(message.guild.memberCount);

        memberCount(message.member);
        
        var count = 0;

        message.guild.members.forEach(member => {
            if (!member.roles.find(role => role.name === "Member")) {
                addMember(member);
                count++;
            }
        });

        if (count > 0 && mC) return message.channel.send("```md\n[Roles] Fixed roles for "+count+" member(s)! ]:```");
        if (count > 0) return message.channel.send("```md\n[Roles] Fixed roles for "+count+" member(s)! ]:\n[MemberCount] Fixed member count! ]:```");
        if (!mC) return message.channel.send("```md\n[MemberCount] Fixed member count! ]:```");
        return message.channel.send("```md\n[Fix] Nothing to fix! ]:```");

    } else {
        return message.channel.send("Pssst... you shouldn't know this command ._.");
    }

};

module.exports.help = {
    name: "fix",
};

function memberCount(member) {

    let channelID = channels.memberCount.channelID;
    let channel = member.guild.channels.find(channel => channel.id == channelID);
    let guild = member.guild;

    channel.setName("lounge [afk] - " + guild.memberCount + " members");

}

function addMember(member) {

    let role = member.guild.roles.find(role => role.name == 'Member'); //looks for the Member role

    member.addRole(role); //add the Member role to the user

}