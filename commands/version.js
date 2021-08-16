const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"version",
    "enabled":true,
    "description":"idek man, i think it gets the verion",
    "help":"Displays the version of mcss, api, and whether it's a dev build or not.",

    async run(message, client) {

        if (message.guild) {
        //API Token Request
        let serverconfJSON = await fse.readFile(`./server-data/${message.guild.id}/mcssconfig.json`)
        let serverconf = JSON.parse(serverconfJSON)
        const params = new URLSearchParams();
        params.append('username', serverconf.mcssUsername);
        params.append('password', serverconf.mcssPassword);

        try {
            apiToken = await fetch(`${serverconf.mcssURL}:${serverconf.mcssPort}/api/token`, { method: 'POST', body: params })
           .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`)
                message.channel.send({ embeds: [embed] });
            return;
        }
        //API Version Request
        const headers = {
            'Authorization': `Bearer ${apiToken.access_token}`
        }
        try {
            apiMessage = await fetch(`${serverconf.mcssURL}:${serverconf.mcssPort}/api/version`, { headers: headers })
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`)
                message.channel.send({ embeds: [embed] });
            return;
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Version:")
            .setDescription("**MCSS Version: **```" + apiMessage.McssVersion + "```" +
            "\n**MCSS API Version: **```" + apiMessage.McssApiVersion + "```" +
            "\n**Dev Build: **```" + apiMessage.IsDevBuild + "```")
            message.channel.send({ embeds: [embed] });
    }
}
}
