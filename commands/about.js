const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    name: "about",
    enabled: true,
    description: "Displays information about the bot.",

    async run(client, interaction) {
        const { MessageActionRow, MessageButton } = require('discord.js');
        const button = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://github.com/Endrf/mcserversoft-api-discord-bot')
					.setLabel('Source Code')
					.setStyle('LINK'),
			);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('**About:**')
            .addField('**MCSS Discord Bot**', 'Created by Endrf')
        interaction.reply({ embeds: [embed], components: [button] })
    }
}