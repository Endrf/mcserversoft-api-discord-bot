const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    name: "apistatus",
    enabled: true,
    description: "Displays the connection to the api.",
    
    async run(client, interaction) {
        if (interaction.guild) {
        try {
            let serverconfJSON = await fse.readFile(`./server-data/${interaction.guild.id}/mcssconfig.json`)
            let serverconf = JSON.parse(serverconfJSON)
            apiMessage = await fetch(`${serverconf.mcssURL}:${serverconf.mcssPort}`)
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("Api Status:")
                .setDescription("```css\n[OFFLINE]```\nReason: " + error.name);
            interaction.reply({ embeds: [embed] });
            return;
        }
        
        if (apiMessage.message) {
            let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle("Api Status:")
                .setDescription("```ini\n[ONLINE]```");
            interaction.reply({ embeds: [embed] });
        }
    }
    }    
}
