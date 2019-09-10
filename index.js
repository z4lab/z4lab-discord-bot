const Discord = require("discord.js");
const fs = require("fs");
const colors = require('colors/safe');

const timestamp = require('./util/timeStamp');

const config = require("./config/bot.json");
const dbs = require('./config/dbs.json');
const channels = require('./config/channels.json');
const servers = require("./config/servers.json");
const whitelist = require("./config/whitelist.json");

require('./util/console');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.config = {};
bot.config.main = config;
bot.config.dbs = dbs;
bot.config.channels = channels;
bot.config.servers = servers;
bot.config.whitelist = whitelist;

bot.sleep = function (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms*1000);
    });
};

bot.modifiedDate = function (file) {  
    let { mtime } = fs.statSync(file);
    return mtime;
};

fs.readdir('./commands', (err, file) => { // gets content of /commands folder
    if (err) console.log(err); // err handling

    let jsfile = file.filter(f => f.split(".").pop() === "js"); // checks for .js files
    if (jsfile.length <= 0) { // checks if no file exist
        console.log(colors.yellow("[WARNING] Couldn't find any commands!")); // no file err
        return; // leave
    }
    jsfile.forEach((f, i) => { // gets all files
        let props = require(`./commands/${f}`); // from /commands folder
        let date = bot.modifiedDate(`./commands/${f}`);
        console.log(colors.white(timestamp(date)) + colors.grey(`[Command] ${f} loaded!`)); // console log print form module
        bot.commands.set(props.help.name, props); // set files as command
    });
    console.log('');
});


Object.assign(module.exports, {
    bot
});


require('./events/error');
require('./events/guildBanAdd');
require('./events/guildBanRemove');
require('./events/guildMemberAdd');
require('./events/guildMemberRemove');
require('./events/message');
require('./events/ready');

require('./util/rconHandler');

bot.login(config.token);