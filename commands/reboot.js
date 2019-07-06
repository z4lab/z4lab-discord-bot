module.exports.run = async (bot, message) => {

    if (message.member.hasPermission("ADMINISTRATOR")) {

        await message.reply("Rebooting...");

        process.exit(1);

    } else {
        return message.channel.send("Pssst... you shouldn't know this command ._.");
    }
};

module.exports.help = {
    name: "reboot",
    category: "main",
    usage: false,
    description: "reboots bot",
    permissionLvl: 3
};