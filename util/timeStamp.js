module.exports = function (time) {
    if (!time) time = new Date();
    if (!(time instanceof Date)) time = new Date();
    return `[${time.toLocaleDateString()}] - [${time.toLocaleTimeString()}] `;
};