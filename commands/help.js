const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('../config.json');

module.exports = {
    "help":"Displays the bots commands.",
    "apistatus":"Displays the connection to the api.",
    "version":"Displays the version of mcss, api, and whether it's a dev build or not.",
    "servers":"Displays all the servers you have on mcss.",
    "serversfull":"Displays more information on all the servers you have on mcss.",
    async run(message) {
        let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Commands:")
        .setDescription("Be sure to add " + config.prefix + " before the command" + 
        "\n**`help`** - " + this.help + 
        "\n**`apistatus`** - " + this.apistatus + 
        "\n**`version`** - " + this.version + 
        "\n**`servers`** - " + this.servers + 
        "\n**`serversfull`** - " + this.serversfull)
        message.channel.send(embed)
    }
}