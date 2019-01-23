const Discord = require("discord.js");
const fs = require("fs");
const colors = require('colors/safe');

const config = require("./config/bot.json");
const dbs = require('./config/dbs.json');
const channels = require('./config/channels.json');

require('./util/console');
require('./util/dbHandler');
require('./util/config');

const { db_arena, db_beginner, db_pro } = require('./util/dbHandler');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();


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
    bot,
    config,
    db_arena,
    db_beginner,
    db_pro,
    dbs,
    channels,
});


require('./events/error');
require('./events/guildMemberAdd');
require('./events/guildMemberRemove');
require('./events/message');
require('./events/ready');

bot.login(config.token);