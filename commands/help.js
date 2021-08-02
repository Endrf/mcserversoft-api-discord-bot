const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "help":"Displays the bots commands.",
    //"apistatus":"Displays the connection to the api.",
    //"version":"Displays the version of mcss, api, and whether it's a dev build or not.",
    //"servers":"Displays all the servers you have on mcss.",
    //"serversfull":"Displays more information on all the servers you have on mcss.",
    async run(message, client) {
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands:")
            .setDescription("Be sure to add `" + config.prefix + "` before the command"
        
        for(command of client.commands) {
            if(command.enabled) embed.addField(command.name, command.help);
        }

        message.channel.send(embed)
    }
}
