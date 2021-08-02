<img src="https://i.imgur.com/uJFyBwF.png" alt="MCSS Logo" align="right">
<div align="center">
  <h1>MCSS Discord Bot</h1>
  <h3>A Discord bot that connects to the MCSS API</h3>
  <h4>Work In Progress</h4>
  <h4><a href="https://mcserversoft.com/">MCSS Website</a></h4>
<div align="left">

## Important
  ### Currently the MCSS API is a work in progress and may be unstable.
  ### I'm not that good at coding and made this bot very quickly so there are probably a lot of bugs and faults in my code.
  ### Use at your own risk
## Screenshot
<img src="https://i.imgur.com/uhiwJda.png" alt="MCSS Logo" align="center">
  
## How To Setup (Discord Bot)
  #### 1. Download the discord bot by either clicking code and download zip or click on releases and download there.
  #### 2. Unzip the contents into a folder and edit config.json (If you don't know what to change scroll down to the config section)
  #### 3. Run the code in command prompt / terminal with the command "node ." (If that doesn't work then start it with the command "node main.js")
## How to setup (MC Server Soft)
  #### 1. Download dev build from MCSS discord server (<a href="https://discord.com/invite/DEn89PB">Discord</a>)
  #### 2. Click file > Options at the top right then scroll down and click "Enable Web API"
  #### 3. Configure Users
  #### 4. Restart MCSS to start Api server
## Dependencies
  ### This bot was made with these versions but may work with older versions
  #### node.js dependecies
  * Node.js - v14.17.2
  * Discord.js - v12.5.3
  * fs-extra - v10.0.0
  * node-fetch - v2.6.1
  #### mcss version
  * mcss - v11.14.0 (270421.0)
  * mcss api - v0.1.0
## Configuration
  ### Default:
  ```
    "bot_token": "",
    "prefix": "-",
    "embedColor": "#5ef25e",
    "mcssURL": "http://127.0.0.1",
    "mcssPort": "25560",
    "mcssUsername": "admin",
    "mcssPassword": "password",
    "statusText": "MC Server Soft",
    "statusType": "WATCHING"
  ```
  
  ### Meanings:
  #### <code>bot_token</code> - The token for your discord bot. (Obtain through discord developer portal)
  #### <code>prefix</code> - The prefix you want the discord to respond to in your discord server.
  #### <code>embedColor</code> - The color you want on the side of embed messages.
  #### <code>mcssURL</code> - The URL for your MCSS API. If the discord bot is on the same computer as mcss use "127.0.0.1". If it's on the same network set it to the local ip address of the computer that mcss is running on. If it's on a different network you have to port forward and use your public ip address.
  #### <code>mcssPort</code> - The port mcss api is running on. (Found in mcss api settings and is usually 25560)
  #### <code>mcssUsername</code> - The username for the mcss api. (Found in mcss api settings)
  #### <code>mcssPassword</code> - The password for the mcss api. (Found in mcss api settings)
  #### <code>statusText</code> - The status that the discord bot displays.
  #### <code>statusType</code> - The type of status the discord bot displays. (PLAYING or WATCHING)
## Commands
  #### apistatus - Displays the connection to the api. ([ONLINE] or [OFFLINE] + reason)
  #### version - Displays the version of mcss, api, and whether it's a dev build or not.
  #### servers - Displays all the servers you have on mcss.
  #### serversfull - Displays more information on all the servers you have on mcss
## Work In Progress (Not Yet Implemented)
  #### Multi-Server Support
  #### Hosting the discord bot
  #### Command: server (server name/id) - Display info on a single server
  #### Command: serverfull (server name/id) - Display more info on a single server
  #### Command: autoservers / server - Automatically update info on all / a single server
## Current Known Problems
  #### Auto Start, Keep Online Mode, JavaAllocatedMemory, JavaStartupLine, Description, FolderName, and InstanceType does not report correctly so I could not add them to the servers or serversfull command - Reason: Not sure why. Could be an error in the api or user error
