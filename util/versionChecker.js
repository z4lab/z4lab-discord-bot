const superagent = require('superagent');

module.exports = function (_version) {

superagent.get('https://raw.githubusercontent.com/13ace37/discordjs-surftimer/z4lab/config/example-bot.json')
    .query({
        format: 'json'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
        if (err) throw err;

        var version = JSON.parse(res.text).version.version;
        var build;

        if (_version == version) {
            build = 'stable';
        } else {
            _version = _version.split('.');
            version = version.split('.');
            if (_version[1] == version[1] && Number(_version[2]) < Number(version[2])) build = 'outdated';
            if (_version[1] == version[1] && Number(_version[2]) > Number(version[2])) build = 'dev';
            if (Number(_version[1]) < Number(version[1])) build = 'outdated';
            if (Number(_version[1]) > Number(version[1])) build = 'dev';
        }
        console.log(build);
        console.log(_version);
        console.log(version);
    });
};