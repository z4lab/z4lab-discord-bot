const fixTime = require('./fixTime');
module.exports = function (time) {
    if (!time) time = new Date();
    if (!(time instanceof Date)) time = new Date();
    //Format [HH:MM:SS] - DD.MM.YYYY
    return `[${Math.round(time.getTime() / 1000)}] `;
    //return `[${fixTime(time.getHours())}:${fixTime(time.getMinutes())}:${fixTime(time.getSeconds())}] - ${fixTime(time.getDate())}.${fixTime(time.getMonth() + 1)} ${time.getFullYear()}`;
};