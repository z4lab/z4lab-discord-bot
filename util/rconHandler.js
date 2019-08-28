const rconConnection = require("srcds-rcon");

const { bot } = require("../index");

bot.rcon = {};


//creating games
bot.rcon.mc   = {}; // not supported switch to "rcon" module
bot.rcon.csgo = {};
bot.rcon.gmod = {}; // not supported switch to "rcon" module

//creating csgo game modes
bot.rcon.csgo.aim = {};
bot.rcon.csgo.surf = {};

//creating csgo aim game modes/servers
bot.rcon.csgo.aim.warmup = rconConnection({address:bot.config.servers.warmup.host+":"+bot.config.servers.warmup.port, password: bot.config.servers.warmup.rcon});
bot.rcon.csgo.aim.arena = rconConnection({address:bot.config.servers["1v1"].host+":"+bot.config.servers["1v1"].port, password: bot.config.servers["1v1"].rcon});

//creating csgo surf servers
bot.rcon.csgo.surf.beginner = rconConnection({address:bot.config.servers.beginner.host+":"+bot.config.servers.beginner.port, password: bot.config.servers.beginner.rcon});
bot.rcon.csgo.surf.pro = rconConnection({address:bot.config.servers.pro.host+":"+bot.config.servers.pro.port, password: bot.config.servers.pro.rcon});
bot.rcon.csgo.surf.vip = rconConnection({address:bot.config.servers["vip-surf"].host+":"+bot.config.servers["vip-surf"].port, password: bot.config.servers["vip-surf"].rcon});
bot.rcon.csgo.surf.dev = rconConnection({address:bot.config.servers.dev.host+":"+bot.config.servers.dev.port, password: bot.config.servers.dev.rcon});

//creating gmod server
bot.rcon.gmod.ttt = {};

//creating mc servers
bot.rcon.mc.vanilla = {};
bot.rcon.mc.ftb = {};

//groups
bot.rcon.groups = {};
bot.rcon.groups.surf = [];

Object.keys(bot.rcon.csgo.surf).forEach(server => {
    bot.rcon.groups.surf.push(bot.rcon.csgo.surf[server]);
});

bot.rcon.groups.aim = [];

Object.keys(bot.rcon.csgo.aim).forEach(server => {
    bot.rcon.groups.aim.push(bot.rcon.csgo.aim[server]);
});

bot.rcon.groups.all = [];

Object.keys(bot.rcon.csgo.surf).forEach(server => {
    bot.rcon.groups.all.push(bot.rcon.csgo.surf[server]);
});

Object.keys(bot.rcon.csgo.aim).forEach(server => {
    bot.rcon.groups.all.push(bot.rcon.csgo.aim[server]);
});

