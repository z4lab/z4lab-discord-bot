const timestamp = require('../util/timeStamp');
const sql = require("../util/db/sql");

global.bot.on('ready', () => {
    console.log('');
    console.log(timestamp() + global.bot.modules.util.colors.green('[Discord] Connected!'));
    console.log(timestamp() + global.bot.modules.util.colors.grey(`[Discord] ${bot.user.tag} started!`));
    console.log('');
    sql.loadSettings(global.bot);
});
