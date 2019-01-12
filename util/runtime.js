const fixTime = require('./fixTime');
module.exports = function (get) {
    let runtime = get.runtime; //timestuff
    let minutes = runtime / 60; //minutes define
    minutes = minutes % 60; //minutes define
    let seconds = Math.round(runtime); //seconds define
    seconds = runtime % 60; //seconds define
    let milli = Math.round(runtime * 100); //ms define
    milli = milli % 100; //ms define
    minutes = Math.floor(minutes); //minutes define
    seconds = Math.floor(seconds); //seconds define
    minutes = fixTime(minutes); //minutes force to two-digit
    seconds = fixTime(seconds); //seconds force to two-digit
    milli = fixTime(milli); //milli force to two-digit
    return { milli, seconds, minutes}; //auch mit this.minutes machbar!
};