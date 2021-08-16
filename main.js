const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const config = require('./config.json');


client.commands = new Discord.Collection();
const commandFiles = fse.readdirSync("./commands/")
    .filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    var username = client.user.username
    console.log(`${username} is Online`);
    if (config.statusText && config.statusType) {
    client.user.setActivity(config.statusText, {type: config.statusType});
    }
});

client.on('messageCreate', message => {
    if (message.content.startsWith(config.prefix)) {
        let fullcmd = message.content.slice(config.prefix.length)
        let cmd = fullcmd.toLowerCase().split(' ')[0]
        let args = fullcmd.split(' ').slice(1)
        command = client.commands.get(cmd)
        if (command) command.run(message, client, args)
    }
})

client.login(config.bot_token);
