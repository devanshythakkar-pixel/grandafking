const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. Keep-Alive Web Server
app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

// 2. Bot Configuration
const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, // Standard port
    username: 'MambaBot', // Any name you want
    version: false // Automatically detects version
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('Bot has joined the server!');
    });

    // Auto-reconnect if kicked
    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 30 seconds...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => console.log(err));
}

createBot();
