const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('../config.json');

exports.run = async (message) => {
    //API Token Request
    const params = new URLSearchParams();
    params.append('username', config.mcssUsername);
    params.append('password', config.mcssPassword);
    try {
    apiToken = await fetch(config.mcssURL + ":" + config.mcssPort + "/api/token", { method: 'POST', body: params })
    .then(response => response.json());
    } catch(error) {
        let embed = new Discord.MessageEmbed()
            .setColor("#e63939")
            .setTitle("ERROR:")
            .setDescription("Reason: " + error.name)
            message.channel.send(embed)
        if(error = true) {
            return;
        }
    }

    //API Servers Request
    const headers = {
        'Authorization': 'Bearer ' + apiToken.access_token
    }
    try {
        apiMessage = await fetch(config.mcssURL + ":" + config.mcssPort + "/api/servers/minimal", { headers: headers })
        .then(response => response.json())
        } catch(error) {
            let embed = new Discord.MessageEmbed()
            .setColor("#e63939")
            .setTitle("ERROR:")
            .setDescription("Reason: " + error.name)
            message.channel.send(embed)
        }
        loop = 0
        server = 1
        let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Servers:")
        while (loop < apiMessage.length) {
            if (apiMessage[loop].Status == 0) {
                status = "```css\n[OFFLINE]```"
            } else if (apiMessage[loop].Status == 1) {
                status = "```ini\n[ONLINE]```"
            } else if (apiMessage[loop].Status == 3) {
                status = "```fix\n[STARTING]```"
            } else if (apiMessage[loop].Status == 4) {
                status = "```css\n[STOPPING]```"
            }
            embed.addField("**Server " + server + "**", "**Server Name: **```" + apiMessage[loop].Name + "```" + 
            "\n**Server Status: **" + status + 
            "\n**Server ID: **```" + apiMessage[loop].Guid + "```", true);
            loop = loop + 1
            server = server + 1
        }
        message.channel.send(embed)
}