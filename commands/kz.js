const { RichEmbed } = require("discord.js");
const gamedig = require('gamedig');


module.exports.run = function (bot, message, args, prefix) {

    gamedig.query(bot.config.servers["kz"],
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

                //connection
                let connectLink = `steam://connect/${state.query.host}:${state.query.port}`;

                embed = new RichEmbed()
                    .setTitle(serverName)
                    .setThumbnail(bot.user.avatarURL)
                    .addField(`Current Map`, map, true)
                    .addField(`Current Players`, playerCount + '/' + maxPlayers, true)
                    .addField(`Steam Connect Link`, connectLink, false);

            } else {
                embed = new RichEmbed()
                    .setTitle("[KZ] z4lab Climbing/Kreedz | 128 Tick // z4lab.com", true)
                    .setThumbnail(bot.user.avatarURL)
                    .addField(`Server currently unavailable`, "check again soon", false);
            }

            return message.channel.send(embed);

        });



};

module.exports.help = {
    name: "kz",
    category: "servers",
    usage: false,
    description: false,
    permissionLvl: 0
};