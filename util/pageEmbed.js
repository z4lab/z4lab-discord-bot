const { bot } = require('../index');
const { RichEmbed } = require('discord.js');



class pageEmbed {
    constructor(title, pages, msg, startpage){
        return new Promise((resolve, reject) => {
            this.title = title;
            this.pages = pages;
            this.pageAmount = pages.length;
            this.msg = msg;
            this.startpage = startpage;
    
    
            this.msg.channel.send('', this.parse())
                .then(m => {
                    m.react("\👈")
                        .then(r => {
                            m.react('\👉');
                            resolve(this);
                        });
                });
        });

    }


    parse() {
        let embed = new RichEmbed()
            .setTitel(this.title);
        pages.forEach(page => {
            embed.addField(page.title, page.content, page.inLine);
        });
        return embed;
    }
}


module.exports = {
    pageEmbed
};