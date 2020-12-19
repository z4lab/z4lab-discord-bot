#!/bin/bash

### CHANGE THESE SETTINGS FOR YOU INSTANCE ###
CURRENTINSTALL="/srv/discord/z4lab-discord-bot-dev"
PM2ID="1"
### CHANGE THESE SETTINGS FOR YOU INSTANCE ###

# color settings, no need to change!
RST='\e[0m'       # reset everything
RED='\e[0;31m'    # red color
GRN='\e[0;32m'    # green color
YLW='\e[0;33m'    # yellow color
BLNK='\e[5m'      # blink, for the waiting indicator

changed=0

# check for install dir
echo -en "[1/5] ${YLW}check for install directory: ${BLNK}...\n"
if [[ -d "${CURRENTINSTALL}" ]]
then
    echo -e "${RST}[1/5] ${YLW}check for install directory: ${GRN}DONE!${RST}\n"
    cd $CURRENTINSTALL
else
	echo -e "${RST}[1/5] ${YLW}check for install directory: ${RED}FAILED!${RST}\n"
	exit 2
fi

# git fetch
echo -en "[2/5] ${YLW}running git fetch: ${BLNK}...${RST}\n"
git fetch
echo -e "${RST}[2/5] ${YLW}running git fetch: ${GRN}DONE!${RST}\n"

# git checkout -f
echo -en "[3/5] ${YLW}removing added changes: ${BLNK}...${RST}\n"
git checkout -f | grep -q -v 'Your branch is up to date with' && changed=1
echo -e "${RST}[3/5] ${YLW}removing added changes: ${GRN}DONE!${RST}\n"

# git fetch
echo -en "[4/5] ${YLW}running git pull: ${BLNK}...${RST}\n"
if [ "$changed" -eq "1" ]; then
	git pull
	echo -e "${RST}[4/5] ${YLW}running git pull: ${GRN}DONE!${RST}\n"
else 
	echo -e "${RST}[4/5] ${GRN}skipping git pull already up to date.${RST}\n"
fi

# restart bot
if [ "$changed" -eq "1" ]; then
	echo -en "[5/5] ${YLW}restarting bot due to changes: ${BLNK}...${RST}\n"
	pm2 restart $PM2ID
	echo -e "${RST}[5/5] ${YLW}restarting bot due to changes: ${GRN}DONE!${RST}\n"
else
	echo -en "[5/5] ${GRN}skipping restart no changes found.${RST}\n"
fi

# end
echo -en "[-/-] ${GRN}update is complete${RST}\n"
exit 0
