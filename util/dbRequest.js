const SteamAPI = require('steamapi');
const config = require("../config/bot.json");
const steamapi = new SteamAPI(config.steam["api-key"]);
const fixTime = require("../util/fixTime.js");
var dbRequest = {};
module.exports = dbRequest;
/**
 * getProfile function
 * @param {string} name player name -- user input
 * @param {string} server server name -- user input
 * @param {object} mysql beginner/pro server mysql connection
 */
var getProfile = dbRequest.getProfile = function getProfile(name, server, mysql) {



};
/**
 * getMaptime function
 * @param {string} name player name -- user input
 * @param {bool}   record maprecord or not -- user input if name isnt defined
 * @param {object} map map name -- user input
 * @param {string} server server name -- user input
 * @param {object} mysql pro server mysql connection
 */
var getMaptime = dbRequest.getMaptime = async function getMaptime(name, record, map, server, mysql) {

    var result = {};
    result.error = {};
    result.error.id = 0;
    result.error.name = false;
    result.error.print = false;

    server = server.charAt(0).toUpperCase() + server.slice(1);

    var username = name;

    if (name != null) name = "AND name LIKE '%" + String(username) + "%'";
    else name = '';

    mysql.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE'%${map}%' ${name} AND style = '0' ORDER BY runtimepro ASC`, function (error, res) {
        if (error) {
            result.error.id = 1;
            result.error.name = 'Error while database request!';
            return console.log(result.error);
        } else {
            if (String(res) != []) map = res[0].mapname;
            if (String(res) == []) {
                mysql.query(`SELECT * FROM ck_maptier WHERE mapname LIKE '%${map}%'`, function (error, res) {
                    if (error) {
                        result.error.id = 1;
                        result.error.name = 'Error while database request!';
                        return console.log(result.error);
                    }

                    if (String(res) == [] && result.error.id == 0) {
                        result.error.id = 2;
                        result.error.name = '```md\n[Error] Map <' + map + '> isn\'t on the server or wasn\'t added yet! ]:```';
                        result.error.print = true;
                    }

                    if (name != '' && result.error.id == 0) {
                        result.error.id = 3;
                        result.error.name = '```md\n[Error] The player hasn\'t finished <' + res[0].mapname + '> yet! ]:```';
                        result.error.print = true;
                    }
                    if (result.error.id == 0) {
                        result.error.id = 4;
                        result.error.name = '```md\n[Error] <' + get[0].mapname + '> wasn\'t finished yet! ]:```';
                        result.error.print = true;
                    }
                    return;
                });
            }
            if (result.error.id == 0) {
                let ms = res[0].runtimepro * 1000;
                let round = ms > 0 ? Math.floor : Math.ceil;
                let minutes = fixTime(round(ms / 60000) % 60);
                let seconds = fixTime(round(ms / 1000) % 60);
                let milli = round(ms) % 1000;
                if (milli.length > '2') milli = fixTime(milli.slice(0, -1));
                else milli = fixTime(milli);
                let id = res[0].steamid;
                let playername = res[0].name;
                mysql.query(`SELECT * FROM ck_playertimes WHERE mapname LIKE '%${map}%' AND style = '0' ORDER BY runtimepro ASC`, function (err, get) {
                    if (err) console.log(err);
                    for (var i = 0; i < get.length; i++) {
                        if (get[i].steamid == id) {
                            var rank = i + 1;
                        }
                    }
                    var record = 'Map';
                    var record2 = 'the record';
                    if (name != '') {
                        record = 'Player';
                        record2 = 'his personal record';
                    }
                    result.runtime = '```md\n# ' + record + ' Record @ ' + server + ' Server #\n\n[' + playername + '] holds ' + record2 + ' on < ' + get[0].mapname + ' > with a time of < ' + minutes + ":" + seconds + "." + milli + ' > ! Rank [' + rank + '/' + get.length + '] ]:```';
                });
            }
        }
    });
    await sleep(200);
    return result;
};
/**
 * getPlaytime function
 * @param {string} name player name -- user input
 * @param {object} mysql0 beginner server mysql connection
 * @param {object} mysql1 pro server mysql connection
 */
var getPlaytime = dbRequest.getPlaytime = function getPlaytime(name, mysql0, mysql1) {



};


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}