const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"apistatus",
    "enabled":true,
    "description":"idek man, i think it gets the api status",
    "help":"Displays the connection to the api.",
    
    async run(message, client) {
        if (message.guild) {
        let serverconfJSON = await fse.readFile(`./server-data/${message.guild.id}/mcssconfig.json`)
        let serverconf = JSON.parse(serverconfJSON)
        try {
            apiMessage = await fetch(`${serverconf.mcssURL}:${serverconf.mcssPort}`)
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("Api Status:")
                .setDescription("```css\n[OFFLINE]```\nReason: " + error.name);
            message.channel.send({ embeds: [embed] });
            return;
        }
        
        if (apiMessage.message) {
            let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle("Api Status:")
                .setDescription("```ini\n[ONLINE]```");
            message.channel.send({ embeds: [embed] });
        }
    }
    }    
}
