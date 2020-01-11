module.exports.run = async (bot, message, args) => {

    let sql = require("../util/db/sql");
    let result;

    if (!args || args.length === 0) return;

    result = await sql.prefix.change(bot, args[0]);
    
    message.channel.send(result[0]);

    if (!result[1]) sql.loadSettings(bot);

};

module.exports.help = {
    name: "prefix",
    category: "main",
    usage: false,
    description: "change prefix of bot",
    permissionLvl: 3
};