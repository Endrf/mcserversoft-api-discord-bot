const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    var username = client.user.username
    console.log(username + ' is Online');
    if (config.statusText && config.statusType) {
    client.user.setActivity(config.statusText, {type: config.statusType});
    }
});

client.on('message', message => {
    if (message.content.startsWith(config.prefix)) {
        let cmd = message.content.toLowerCase().slice(config.prefix.length)
        if (fse.existsSync('./commands/' + cmd + '.js')){
        let file = require('./commands/' + cmd + '.js');
        file.run(message)
        }
    }
})

client.login(config.bot_token);