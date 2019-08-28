module.exports.run = async (bot, message) => {

    await message.reply("Rebooting...");

    process.exit(1);

};

module.exports.help = {
    name: "reboot",
    category: "main",
    usage: false,
    description: "reboots bot",
    permissionLvl: 3
};