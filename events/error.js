const { bot } = require('../index');
const colors = require('colors/safe');


bot.on('error', () => {
    console.log(colors.red.bold('[Discord] Error!'));
});