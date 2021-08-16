const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"setup",
    "enabled":true,
    "help":"Sets the bots api URL, port, username, and password. (DM to bot)\nUse setup [URL] [Port] [Username] [Password] [Server ID]",

    async run(message, client, args) {
        let perms = false
        try {
            let guild = await client.guilds.cache.get(args[4])
            let users = await guild.members.fetch(message.author)
            let perms = await users.permissions.has('ADMINISTRATOR')
            if (!message.guild && perms) {
                let json = {
                    "mcssURL": args[0],
                    "mcssPort": args[1],
                    "mcssUsername": args[2],
                    "mcssPassword": args[3]
                }
                let jsonString = JSON.stringify(json)
                if (!fse.existsSync(`./server-data/${args[4]}`)) {
                    fse.mkdir(`./server-data/${args[4]}`)
                }
                fse.writeFile(`./server-data/${args[4]}/mcssconfig.json`, jsonString)
                message.channel.send('Config Saved!')
            } else {
                message.channel.send('You do not have permission to execute this command for this server or you need to DM this command to the bot.')
            }
        } catch {
            if (message.guild) {
                message.channel.send('DM command to bot.')
            } else{
                message.channel.send('This server does not exist or you are not in this server.')
            }
        }
    }
}