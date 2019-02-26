const words = require('../config/alias.json');

module.exports = function (word) {
    var alias = word;
    for (var i = 0; i < words.alias.length; i++) {
        if(words.alias[i].alias.includes(word)){
            alias = words.alias[i].name;  
        } 
    }
    return alias;
};