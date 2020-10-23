module.exports = function (number) {
	if (number < 10) number = '0' + number;
	return number;
};