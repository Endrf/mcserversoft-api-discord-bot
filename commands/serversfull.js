const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"serversfull",
    "enabled":true,
    "description":"idek man, i think it gets the api status",
    "help":"Displays more information on all the servers you have on mcss.",
    async run(message, client) {

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
                .setDescription(`Reason: ${error.name}`);
            message.channel.send(embed);
            return;
        }

        //API Servers Request
        const headers = {
            'Authorization': `Bearer ${apiToken.access_token}`
        }
        try {
            apiMessage = await fetch(config.mcssURL + ":" + config.mcssPort + "/api/servers", { headers: headers })
            .then(response => response.json())
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`);
            message.channel.send(embed);
            return;
        }

        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Servers:")

        for(server in apiMessage) {
            statusTypes = [
                "css\n[OFFLINE]",
                "ini\n[ONLINE]",
                "css\n[NONE]",
                "fix\n[STARTING]",
                "css\n[STOPPING]"
            ];
            status = "```" + statusTypes[apiMessage[server].Status] + "```";
            embed.addField(`**Server ${parseInt(server) + 1}**`, "**Server Name: **```" + apiMessage[server].Name + "```" + 
            "\n**Server Status: **" + status + 
            "\n**Server ID: **```" + apiMessage[server].Guid + "```" + 
            "\n**Server Path: **```" + apiMessage[server].PathToFolder + "```" + 
            "\n**Auto Start: **```" + apiMessage[server].IsSetToAutoStart + "```" + 
            "\n**Keep Online Mode: **```" + apiMessage[server].KeepOnline + "```",true);
        }
        message.channel.send(embed);
    }
}
