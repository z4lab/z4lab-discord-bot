module.exports.run = async (bot, message, args) => {

    let sql = require("../util/db/sql");
    let timestamp = require("../util/timeStamp");
    let result;

    if (!args || args.length === 0) return;

    if ((args[0] === "add" || args[0] === "create") && args.length >= 3) result = await sql.insertAlias(bot, args[1], args[2]);
    else if ((args[0] === "remove" || args[0] === "rm") && args.length >= 2) result = await sql.deleteAlias(bot, args[1]);
    else if ((args[0] === "rename" || args[0] === "rn") && args.length >= 3) result = await sql.modifyAlias(bot, args[1], args[2]);
    else return;
    
    message.channel.send(result[0]);

    if (!result[1]) sql.loadSettings(bot);

};

module.exports.help = {
    name: "alias",
    category: "main",
    usage: false,
    description: "add/rename/delete alias",
    permissionLvl: 3
};