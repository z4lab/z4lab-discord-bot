const Bot = require(process.cwd());
/**
 * 
 * @param {String} name - name of the interval
 * @param {Function} func - function to call
 * @param {Number} time - time the interval repeats
 */
var createInterval = (name, func, time, ...args) => {
	time *= 1000; // secs to ms 
	Bot.Intervals[name] = setInterval(func, time, ...args);
	Bot.Logger.info("Discord Intervals", "Created global bot interval. [%s] each %is", name, time / 1000);
}


module.exports = () => {

	Bot.Logger.info("Discord Intervals", "Creating global bot intervals.");
	createInterval("checkPresence", Bot.Utils.checkPresence, 10);
	createInterval("checkUtils", Bot.Utils.loadUtils, 15);

}