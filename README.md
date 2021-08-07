<p align="center">
    <h1 align="center">-# z4lab Discord Bot #-</h1>
    <strong>
         <p align="center">
              A former community discord bot for z4lab.
         </p>
    </strong>
</p>

This branch is the only active one atm. I'm recoding the whole bot with a live reload system and the Commando framework by discord.js.

The z4lab community, as of April 25, 2021, no longer provides public game servers. This includes support for all software and services created or maintained by our team members. Under some exceptions, support may still be provided, but this is not expected in any view. It should also be noted that all software and services provided by us may no longer be functional. All provided softwares or services were created for and in the sense exactly for our community and fulfilled our purpose. 
Thank you for your understanding ~ ace 

<details>
    <summary><b>Information</b></summary>
    
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

</details>
