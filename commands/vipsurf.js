const { RichEmbed } = require("discord.js");
const gamedig = require('gamedig');


module.exports.run = function (bot, message) {

    message.channel.startTyping();

    let serverDetails = bot.config.servers["vip-surf"];
    delete serverDetails.rcon;

    gamedig.query(serverDetails,
        function (e, state) {

            var embed;

            if (!e) {
                // server hostname
                let serverName = state.name;

                // map
                let mapArray = state.map.split('/');
                let map = mapArray[2] || mapArray[0];

                // players
                let playerCount = state.raw.numplayers;
                let maxPlayers = state.maxplayers;

                // connection
                let connectLink = `steam://connect/${state.query.host}:${state.query.port}`;

                embed = new RichEmbed()
                    .setTitle(serverName)
                    .setThumbnail(bot.user.avatarURL)
                    .addField(`Current Map`, map, true)
                    .addField(`Current Players`, playerCount + '/' + maxPlayers, true)
                    .addField(`Steam Connect Link`, connectLink, false);

            } else {
                embed = new RichEmbed()
                    .setTitle("[SURF] z4lab VIP/Whitelist Surf | 102 Tick // z4lab.com", true)
                    .setThumbnail(bot.user.avatarURL)
                    .addField(`Server currently unavailable`, "check again soon", false);
            }

            message.channel.stopTyping();

            return message.channel.send(embed);

        });



};

module.exports.help = {
    name: "vipsurf",
    category: "servers",
    usage: false,
    description: false,
    permissionLvl: 0
};