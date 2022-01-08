const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    name: "setup",
    enabled: true,
    description: "Sets the bots api URL, port, username, and password. (DM to bot)",
    channelTypes: "DM",

    async run(client, interaction) {
        let perms = false
        try {
            let guild = await client.guilds.cache.get(args[4])
            let users = await guild.members.fetch(message.author)
            let perms = await users.permissions.has('ADMINISTRATOR')
            if (!interaction.guild && perms) {
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
                interaction.reply('Config Saved!')
            } else {
                interaction.reply('You do not have permission to execute this command for this server or you need to DM this command to the bot.')
            }
        } catch {
            if (interaction.guild) {
                interaction.reply('DM command to bot.')
            } else{
                interaction.reply('This server does not exist or you are not in this server.')
            }
        }
    }
}