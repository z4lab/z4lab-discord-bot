const fixTime = require('./fixTime');
module.exports = function (inDate) {
	if (!inDate) inDate = new Date();
	if (!(inDate instanceof Date)) inDate = new Date();
	return `[${fixTime(inDate.getMonth() + 1)}/${fixTime(inDate.getDate())}/${fixTime(inDate.getFullYear())}] @ [${formatAMPM(inDate)}] `;
	//return `[${inDate.toLocaleDateString()}] - [${inDate.toLocaleTimeString()}] `;
};

function formatAMPM(date = new Date()) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour "0" should be "12"
	return fixTime(hours) + ":" + fixTime(minutes) + ":" + fixTime(seconds) + " " + ampm;
}
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

//[9/9/2019] - [10:24:50 PM]