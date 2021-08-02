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
            return
        }
    }

    //API Version Request
    const headers = {
        'Authorization': 'Bearer ' + apiToken.access_token
    }
    try {
        apiMessage = await fetch(config.mcssURL + ":" + config.mcssPort + "/api/version", { headers: headers })
        .then(response => response.json())
        } catch(error) {
            let embed = new Discord.MessageEmbed()
            .setColor("#e63939")
            .setTitle("ERROR:")
            .setDescription("Reason: " + error.name)
            message.channel.send(embed)
        }
        let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Version:")
        .setDescription("**MCSS Version: **```" + apiMessage.McssVersion + "```" +
        "\n**MCSS API Version: **```" + apiMessage.McssApiVersion + "```" +
        "\n**Dev Build: **```" + apiMessage.IsDevBuild + "```")
        message.channel.send(embed)
}