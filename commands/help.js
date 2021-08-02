const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('../config.json');

exports.run = async (message) => {
    let embed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setTitle("Commands:")
    .setDescription("Be sure to add " + config.prefix + " before the command" + 
    "\n**`help`** - Displays the bots commands." + 
    "\n**`apistatus`** - Displays the connection to the api." + 
    "\n**`version`** - Displays the version of mcss, api, and whether it's a dev build or not." + 
    "\n**`servers`** - Displays all the servers you have on mcss." + 
    "\n**`serversfull`** - Displays more information on all the servers you have on mcss.")
    message.channel.send(embed)
}