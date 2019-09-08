const { bot } = require('../index');
const colors = require('colors/safe');
const timestamp = require('../util/timeStamp');
const sql = require("../util/db/sql");

bot.on('ready', () => {
    console.log('');
    console.log(timestamp() + colors.green('[Discord] Connected!'));
    console.log(timestamp() + colors.grey(`[Discord] ${bot.user.tag} started!`));
    console.log('');
    sql.loadSettings(bot);
});
