#!/bin/bash

### CHANGE THIS SETTINGS FOR YOU INSTANCE ###
INSTALLDIR="/srv"
TMPDIR="/srv/tmp"
CURRENTINSTALL="/srv/z4lab-discord-bot"
### CHANGE THIS SETTINGS FOR YOU INSTANCE ###

# check if tmp directory exists, if not create it
mkdir -p $TEMPDIR

# backup bot.json file
cp $INSTALLDIR/z4lab-discord-bot/config/bot.json $TMPDIR/bot.json
cp $INSTALLDIR/z4lab-discord-bot/config/dbs.json $TMPDIR/dbs.json

# stop the bot
forever stopall

# remove current version
rm -R $CURRENTINSTALL

# get new version
cd $INSTALLDIR && git clone https://github.com/totles/z4lab-discord-bot

# move backup config
mv $TMPDIR/bot.json $INSTALLDIR/z4lab-discord-bot/config/bot.json
mv $TMPDIR/dbs.json $INSTALLDIR/z4lab-discord-bot/config/dbs.json

# move directory do npm install and start the bot
cd $INSTALLDIR/z4lab-discord-bot && npm install && forever start index.js

# clear console and print done
clear
echo "done"
