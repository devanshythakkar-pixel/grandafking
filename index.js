const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('MambaBot is Awake!'));
app.listen(3000, () => console.log('Web server on port 3000'));

const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: 1.21.11 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);
    bot.on('login', () => console.log('SUCCESS: Bot is in the server!'));
    bot.on('end', () => {
        console.log('Bot disconnected. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });
    bot.on('error', (err) => console.log('Error Type:', err.code));
}

createBot();
