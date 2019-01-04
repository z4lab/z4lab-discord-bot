#!/bin/bash

### CHANGE THESE SETTINGS FOR YOU INSTANCE ###
INSTALLDIR="/srv"
TMPDIR="/tmp"
CURRENTINSTALL="/srv/z4lab-discord-bot"
### CHANGE THESE SETTINGS FOR YOU INSTANCE ###

# color settings, no need to change!
RST='\e[0m'       # reset everything
GRN='\e[0;32m'    # green color
YLW='\e[0;33m'    # yellow color
BLNK='\e[5m'      # blink, for the waiting indicator

# check if tmp directory exists, if not create it
echo -en "[1/8] ${YLW}check for tmp directory: ${BLNK}..."
mkdir -p $TEMPDIR
echo -e "${RST}[1/8] check for tmp directory: ${GRN}DONE!${RST}"

# backup bot.json file
echo -en "[2/8] ${YLW}backing up config files: ${BLNK}..."
cp $INSTALLDIR/z4lab-discord-bot/config/bot.json $TMPDIR/bot.json
cp $INSTALLDIR/z4lab-discord-bot/config/dbs.json $TMPDIR/dbs.json
cp $INSTALLDIR/z4lab-discord-bot/config/servers.json $TMPDIR/servers.json
cp $INSTALLDIR/z4lab-discord-bot/config/channels.json $TMPDIR/channels.json
echo -e "${RST}[2/8] ${YLW}backing up config files: ${GRN}DONE!${RST}"

# stop the bot
echo -en "[3/8] ${YLW}stopping the current bot: ${BLNK}..."
forever stopall
echo -e "${RST}[3/8] ${YLW}stopping the current bot: ${GRN}DONE!${RST}"

# remove current version
echo -en "[4/8] ${YLW}removing current version: ${BLNK}..."
rm -R $CURRENTINSTALL
echo -e "${RST}[4/8] ${YLW}removing current version: ${GRN}DONE!${RST}"

# get new version
echo -en "[5/8] ${YLW}installing latest version: ${BLNK}..."
cd $INSTALLDIR && git clone https://github.com/totles/z4lab-discord-bot
echo -e "${RST}[5/8] ${YLW}installing latest version: ${GRN}DONE!${RST}"

# move backup config
echo -en "[6/8] ${YLW}restoring backuped config files: ${BLNK}..."
mv $TMPDIR/bot.json $INSTALLDIR/z4lab-discord-bot/config/bot.json
mv $TMPDIR/dbs.json $INSTALLDIR/z4lab-discord-bot/config/dbs.json
mv $TMPDIR/servers.json $INSTALLDIR/z4lab-discord-bot/config/servers.json
mv $TMPDIR/channels.json $INSTALLDIR/z4lab-discord-bot/config/channels.json
echo -e "${RST}[6/8] ${YLW}restoring backuped config files: ${GRN}DONE!${RST}"

# move directory do npm install and start the bot
echo -en "[7/8] ${YLW}npm install and starting the bot: ${BLNK}..."
cd $INSTALLDIR/z4lab-discord-bot && npm install && forever start index.js
echo -e "${RST}[7/8] ${YLW}npm install and starting the bot: ${GRN}DONE!${RST}"

# clear console and print done
clear
echo -en "[8/8] ${GRN}update is complete${RST}"