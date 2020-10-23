global.bot.on('guildBanRemove', (guild, user) => {
	logBan(guild, user);
	
	function logBan(guild, user) {
	
		let channelID = global.bot.config.channels.log.channelID;
		let channel = guild.channels.find(channel => channel.id == channelID);
		let emoji = global.bot.emojis.find(emoji => emoji.name == 'unban');
	
		let username = user.tag;
	
		channel.send(emoji + ' Ban removed\n' + username + ' ( ' + String(user) + ' ) unbanned from the sanctuary!');
	
	}
});