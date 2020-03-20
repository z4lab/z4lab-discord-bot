#!/bin/bash

# color settings, no need to change!
RST='\e[0m'     # reset everything
RED='\e[0;31m'	# red color
GRN='\e[0;32m'  # green color
YLW='\e[0;33m'  # yellow color
BLNK='\e[5m'    # blink, for the waiting indicator
BLD='\e[1m'		# bold formatting

echo -e "${BLD}${RED}This script is only meant for testing porpuses! Further usage might cause data loss!${RST}"
read -r -p "Do you still want to continue? [y/N] " input
case $input in
    [yY]) ;;
    [nN]) exit 1 ;;
    "") exit 1 ;;
    *) exit 1 ;;
esac

command -v pm2 >/dev/null 2>&1 || { echo >&2 "I require pm2, but it's not installed. Use 'npm i -g pm2' to install pm2."; exit 1; }

# todo add dev clone script