const Discord = require("discord.js");
const fs = require("fs");
const colors = require('colors/safe');

const config = require("./config/bot.json");
const dbs = require('./config/dbs.json');
const channels = require('./config/channels.json');
const servers = require("./config/servers.json");
const whitelist = require("./config/whitelist.json");

require('./util/console');
require('./util/config');
require('./util/dbHandler');

const { db_arena, db_beginner, db_pro, db_whitelist } = require('./util/dbHandler');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.config = {};
bot.config.main = config;
bot.config.dbs = dbs;
bot.config.channels = channels;
bot.config.servers = servers;
bot.config.whitelist = whitelist;
bot.db = {};
bot.db.db_arena = db_arena;
bot.db.db_beginner = db_beginner;
bot.db.db_pro = db_pro;
bot.db.db_whitelist = db_whitelist;


fs.readdir('./commands', (err, file) => { // gets content of /commands folder
    if (err) console.log(err); // err handling

    let jsfile = file.filter(f => f.split(".").pop() === "js"); // checks for .js files
    if (jsfile.length <= 0) { // checks if no file exist
        console.log(colors.yellow("Couldn't find any commands!")); // no file err
        return; // leave
    }
    jsfile.forEach((f, i) => { // gets all files
        let props = require(`./commands/${f}`); // from /commands folder
        console.log(colors.grey(`[Module] ${f} loaded!`)); // console log print form module
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