const fixTime = require('./fixTime');
module.exports = function (time) {
    if (!time) time = new Date();
    if (!(time instanceof Date)) time = new Date();
    return `[${Math.round(time.getTime() / 1000)}] `;
};