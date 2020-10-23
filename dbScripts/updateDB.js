/**
 * Update Script for old database versions - todo: add this into ready.js and auto check for missing tables
 *
 * Start the script using the version as a full number e.g. 1.32.3 -> 1323 ...
 * node dbScripts/updateDB.js <numeric version>
 */

const sql = require("sqlite3");
const path = require('path');
const db  = new sql.Database(path.resolve(__dirname, "../config/main.db"));
const version = process.argv[2] || Infinity;

if (version < 1330) {

	db.run(`CREATE TABLE IF NOT EXISTS \`whitelist\` (
		\`userID\` CHAR NOT NULL DEFAULT "",
		\`steamID64\` CHAR NOT NULL DEFAULT "",
		\`dateAdded\` DATE NOT NULL DEFAULT ""
	)`);

} else {

	if (version === Infinity) return console.log("No version provided!\nUsage: node dbScripts/updateDB.js <numeric version>\nExample: node dbScripts/updateDB.js 1323");
	return console.log("The database is already on your requested version!");

}

