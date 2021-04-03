
const Discord = require('discord.js');  
const { MessageEmbed, MessageAttachment } = require('discord.js');
const client = new Discord.Client(); 
const config = require('./config.json');
const axios = require('axios').default;
const ytdl = require('ytdl-core');
const fs = require("fs")

var dispatcher = ""

//lancé lorsque le bot est ready
client.on("ready", () => {
    play()
}); 

//methode qui gere les message entré dans le tchat
// client.on('message', async message => {
//     //test si message envoyer par un bot
//     if(message.author.bot) return;
// });

function play()
{
    const channel = client.channels.cache.get(process.env.VOC || config.voc);

    if (!channel) return console.error("The channel does not exist!");

    channel.join().then(connection => {

        console.log("Successfully connected.");
        connection.play( ytdl("https://www.youtube.com/watch?v=nvYi3XlP8sk", { filter: 'audioonly' }),{volume: 0.5,});

    }).catch(e => {

        console.error(e);

    });

    dispatcher.on('finish', () => {

        play()

    });
}

//login du bot a discord
client.login(process.env.TOKEN || config.token);