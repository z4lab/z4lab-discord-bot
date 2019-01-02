const { bot } = require('../index');


bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find(role => role.name == 'Member'); //looks for the Member role

    member.addRole(role); //add the Member role to the user

});