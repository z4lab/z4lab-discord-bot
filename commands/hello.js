module.exports.run = function (bot, message, args, prefix) {
    return message.channel.send(`:hand_splayed: ${message.author}`);
};

module.exports.help = {
    name: "hello",
    category: "main",
    usage: false,
    permissionLvl: 0
};