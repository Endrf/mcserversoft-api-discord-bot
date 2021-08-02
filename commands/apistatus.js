const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('../config.json');

exports.run = async (message) => {
    try {
        apiMessage = await fetch(config.mcssURL + ":" + config.mcssPort)
        .then(response => response.json());
    } catch(error) {
        let embed = new Discord.MessageEmbed()
        .setColor("#e63939")
        .setTitle("Api Status:")
        .setDescription("```css\n[OFFLINE]```\nReason: " + error.name);
        message.channel.send(embed);
        return;
    }
    if (apiMessage.message) {
        let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Api Status:")
        .setDescription("```ini\n[ONLINE]```");
        message.channel.send(embed);
    }
}
