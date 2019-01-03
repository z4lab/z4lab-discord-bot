# z4lab-discord-bot
discord bot for z4lab, main author @13ace37

# features
- add new user to specific role
- provide surf timer information (player ranks, map times and much more)
- provide arena stats (rankme kento)
- provide game server information
- some cool gimmicks like `!unixend`

# install
- install forever with `npm install forever -g`
- clone the project to your desired location
- rename `example-bot.json` to `bot.json` and enter your details
- rename `example-dbs.json`to `dbs.json` and enter your details
- rename `example-servers.json`to `servers.json` and enter your details
- rename `example-channels.json`to `channels.json` and enter your details
- run `npm install`
- start bot with `forever start index.js`

# updating the bot
- move `update-bot.sh` outside the install directory
- run chmod +x `update-bot.sh`
- change the default variables in the file (Line 4, 5 & 6)
- run the script with `./update-bot.sh`
