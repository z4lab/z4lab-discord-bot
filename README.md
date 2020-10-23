<p align="center">
    <img src="https://z4lab.com/images/discord-bot-transparent.png" height="280" />
    <h1 align="center">-# z4lab Discord Bot #-</h1>
    <strong>
         <p align="center">
              A community discord bot for <a href="https://z4lab.com/">z4lab</a>.
         </p>
    </strong>
</p>

## features
-   add new user to specific role
-   provide surf timer information (player ranks, map times and much more)
-   provide arena stats (rankme kento)
-   provide game server information (csgo at the moment)
-   provide users (specific role) to whitelist themself on whitelisted servers
-   some cool gimmicks like `.unixend`

## install
-   install forever with `npm install pm2 -g`
-   clone the project to your desired location
-   rename `example-bot.json` to `bot.json` and enter your details
-   rename `example-dbs.json`to `dbs.json` and enter your details
-   rename `example-servers.json`to `servers.json` and enter your details
-   rename `example-channels.json`to `channels.json` and enter your details
-   rename `example-whitelist.json`to `whitelist.json` and enter your details
-   rename `example-alias.json`to `alias.json` and enter your details
-   run `npm install`
-   run `npm db`
    - config files will no longer effect the bot (check "database setup" for more informations)
-   start bot with `pm2 start index.js`

## database setup

<strong>Do not remove any json config file! The bot is still reading from these files!</strong>

Prioritization: 

```php
main.db 	// loaded after bot startup
*.json		// loaded first but gets overwritten by data inside main.db
```

### first use

-   run `npm db`
-   run the bot normally

### merging configs into database

-   run `npm reload`
-   reload or reboot the bot using the commands

### updating database

-   run `npm update`
-   reboot the bot using the reboot command
 

## updating the bot's settings
-   change settings in one of the `.json` files
-   run `npm reload`
-   use `{prefix}reload` in discord

## updating the bot
-   move `update-bot.sh` outside the install directory
-   run chmod +x `update-bot.sh`
-   change the default variables in the file (Line 4, 5, 6 and 7)
-   run the script with `./update-bot.sh`

## branch definitions

```php
master 	// mostly working - used for our public discord server
dev 	// mostly untested changes (maybe not working) - used for our private dev discord server
```