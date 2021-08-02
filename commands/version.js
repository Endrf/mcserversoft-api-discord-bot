const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"apistatus",
    "enabled":true,
    "description":"idek man, i think it gets the verion",
    "help":"there are like things here, idk, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    async run (message, client) {
    
        //API Token Request
        const params = new URLSearchParams();
        params.append('username', config.mcssUsername);
        params.append('password', config.mcssPassword);

        try {
            apiToken = await fetch(`${config.mcssURL}:${config.mcssPort}/api/token`, { method: 'POST', body: params })
           .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`)
            message.channel.send(embed);
            return;
        }

        //API Version Request
        const headers = {
            `Authorization`: `Bearer ${apiToken.access_token}`
        }
        try {
            apiMessage = await fetch(`${config.mcssURL}:${config.mcssPort}/api/version`, { headers: headers })
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`)
            message.channel.send(embed);
            return;
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Version:")
            .setDescription("**MCSS Version: **```" + apiMessage.McssVersion + "```" +
            "\n**MCSS API Version: **```" + apiMessage.McssApiVersion + "```" +
            "\n**Dev Build: **```" + apiMessage.IsDevBuild + "```")
        message.channel.send(embed);
    }
}
