const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const config = require('./config.json');

const register = false // false = apply commands to single server (Development), true = apply commands globally (Production)

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "DIRECT_MESSAGES",
        "GUILD_VOICE_STATES"
    ]
})

const rest = new REST({
    version: "9"
}).setToken(config.bot_token);

async function fileLoad() {
    client.commands = new Discord.Collection();
    const commandFiles = fse.readdirSync("./commands/")
        .filter(file => file.endsWith(".js"))
    appCommands = []
    for(const file of commandFiles){
        const command = require(`./commands/${file}`)
        appCommands.push(command)
        client.commands.set(command.name, command)
    }
    console.log('Files Loaded')
}

client.on('ready', async () => {
    fileLoad()
    try {
        if (register == true) {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: appCommands
            });
            console.log('Registered Bot Commands to Discord API.')
        } else {
            await rest.put(Routes.applicationGuildCommands(client.user.id, '709973144525471845'), { //<Guild ID for deployment
                body: appCommands
            });
            console.log('Registered Bot Commands Locally')
        }
    } catch (err) {
        if (err) console.log(err)
    }
    if (config.statusText && config.statusType) {
    client.user.setActivity(config.statusText, {type: config.statusType});
    }
    console.log(`${client.user.username} is Online`);
});

client.on('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
        let fullcmd = interaction.commandName
        let cmd = fullcmd.toLowerCase().split(' ')[0]
        let args = fullcmd.split(' ').slice(1)
        command = client.commands.get(cmd)
        if (command) command.run(client, interaction, args)
	}
});

client.login(config.bot_token);
