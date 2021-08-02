const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('./config.json');


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/")
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

client.on('message', message => {
    if (message.content.startsWith(config.prefix)) {
        let cmd = message.content.toLowerCase().slice(config.prefix.length)
        client.commands.get(cmd).run(message, client) // probably will cause errors when sending invalid commands
        //file.run(message, client)
        }
    }
})

client.login(config.bot_token);
