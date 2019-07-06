module.exports.run = function (bot, message, args) {
    return message.channel.send(`:hand_splayed: ${message.author}`);
};

module.exports.help = {
    name: "hello",
    category: "main",
    usage: false,
    description: "checks if the bot is online",
    permissionLvl: 0
};