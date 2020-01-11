const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let group = args[0] || false;

    var single;

    args.shift();

    var usage = new Discord.RichEmbed()
        .setTitle('z4lab Discord Bot rcon usage')
        .setThumbnail(bot.user.avatarURL)
        .addField(`${bot.config.main.prefix}rcon [group/server] {command}`, "└ Runs rcon command on given server/group", false)
        .addField(`${bot.config.main.prefix}rcon info [group]`, "└ Shows groups or servers of given group", false);

    var groups = Object.keys(bot.rcon.groups);
    var servers = Object.keys(bot.rcon.csgo.aim).concat(Object.keys(bot.rcon.csgo.surf));

    var info = new Discord.RichEmbed()
        .setTitle('z4lab Discord Bot rcon info')
        .setThumbnail(bot.user.avatarURL)
        .addField("Server Groups:", groups, false)
        .addField("Server List:", servers, false);

    function groupInfo(group = false) {
        if (!group) return info;
        var gServers;
        if (group === "surf") gServers = "beginner\npro\nvip\ndev";
        else if (group === "all") gServers = "beginner\npro\nvip\ndev\narena\nwarmup";
        else if (group === "aim") gServers = "arena\nwarmup";
        return new Discord.RichEmbed()
            .setTitle('z4lab Discord Bot rcon info')
            .setThumbnail(bot.user.avatarURL)
            .addField(`Server List for group "${group}":`, gServers, false);
    }

    if (group === "info" && groups.includes(args[0])) return message.channel.send(groupInfo(args[0]));
    if (group === "info") return message.channel.send(info);
    if (!group) return message.channel.send(usage);

    if (group === "all" || group === "aim" || group === "surf") {

        message.channel.send(`Running command on ${bot.rcon.groups[group].length} servers!`);

        single = false;

    } else {

        if (!bot.rcon.csgo.aim[group] && !bot.rcon.csgo.surf[group]) return message.channel.send(usage);

        single = true;

        message.channel.send(`Running command on 1 server!`);

    }

    var command = args.join(" ");

    if (command.includes("quit")) return message.reply('monkaS');
    if (command.includes("exit")) return message.reply('monkaS');
    if (command.includes("kill_server")) return message.reply('monkaS');
    if (command.includes("sm_rcon")) return message.reply(':joy:');

    if (single) {

        if (bot.rcon.csgo.aim[group]) {
            bot.rcon.csgo.aim[group].connect().then(() => {
                bot.rcon.csgo.aim[group].command(command).then(result => message.channel.send(group + ":\n```\n" + result + "```"))
                    .catch(error => {
                        message.channel.send(`Command error: ${error.message}`);
                        if (error.details && error.details.partialResponse) message.channel.send(group + `:\nPartial response: ${error.details.partialResponse}`);
                    });
                bot.rcon.csgo.aim[group].disconnect().catch(error => {
                    return message.channel.send("```\n" + error + "```");
                });
            }).catch(error => {
                return message.channel.send("```\n" + error + "```");
            });
        } else if (bot.rcon.csgo.surf[group]) {
            bot.rcon.csgo.surf[group].connect().then(() => {
                bot.rcon.csgo.surf[group].command(command).then(result => message.channel.send(group + ":\n```\n" + result + "```"))
                    .catch(error => {
                        message.channel.send(`Command error: ${error.message}`);
                        if (error.details && error.details.partialResponse) message.channel.send(group + `:\nPartial response: ${error.details.partialResponse}`);
                    });
                bot.rcon.csgo.surf[group].disconnect().catch(error => {
                    return message.channel.send(group + ":\n```\n" + error + "```");
                });
            }).catch(error => {
                return message.channel.send(group + ":\n```\n" + error + "```");
            });
        }
    } else {

        bot.rcon.groups[group].forEach((rcon) => {
            rcon.connect().then(() => {
                rcon.command(command).then(result => message.channel.send("```\n" + result + "```"))
                    .catch(error => {
                        message.channel.send(`Command error: ${error.message}`).catch(error => {
                            return message.channel.send("```\n" + error + "```");
                        });
                        if (error.details && error.details.partialResponse) message.channel.send(`Partial  response: ${error.details.partialResponse}`);
                    });
                rcon.disconnect().catch(error => {
                    return message.channel.send("```\n" + error + "```");
                });
            }).catch(error => {
                return message.channel.send("```\n" + error + "```");
            });
        });

    }

    return;
};

module.exports.help = {
    name: "rcon",
    category: "main",
    usage: false,
    description: "rcon for all servers",
    permissionLvl: 3
};