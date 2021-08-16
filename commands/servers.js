const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"servers",
    "enabled":true,
    "description":"idek man, i think it shos servers",
    "help":"Displays all the servers you have on mcss.",

    async run(message, client) {
        if (message.guild) {
        let serverconfJSON = await fse.readFile(`./server-data/${message.guild.id}/mcssconfig.json`)
        let serverconf = JSON.parse(serverconfJSON)
        //API Token Request
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

        //API Servers Request
        const headers = {
            'Authorization': `Bearer ${apiToken.access_token}`
        }

        try {
            apiMessage = await fetch(`${serverconf.mcssURL}:${serverconf.mcssPort}/api/servers/minimal`, { headers: headers })
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`);
            message.channel.send({ embeds: [embed] });
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
            "\n**Server ID: **```" + apiMessage[server].Guid + "```", true);
        }
        message.channel.send({ embeds: [embed] });
    }
}
}
