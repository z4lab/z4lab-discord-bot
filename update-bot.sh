#!/bin/bash

# backup bot.json file
cp /srv/z4lab-discord-bot/config/bot.json /srv/tmp/bot.json
cp /srv/z4lab-discord-bot/config/dbs.json /srv/tmp/dbs.json

# stop the bot
forever stopall

# remove current version
rm -R /srv/z4lab-discord-bot

# get new version
cd /srv/ && git clone https://github.com/totles/z4lab-discord-bot

# move backup config
mv /srv/tmp/bot.json /srv/z4lab-discord-bot/config/bot.json
mv /srv/tmp/dbs.json /srv/z4lab-discord-bot/config/dbs.json

# move directory do npm install and start the bot
cd /srv/z4lab-discord-bot && npm install && forever start index.js

# clear console and print done
clear
echo "done"
