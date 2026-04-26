const mineflayer = require('mineflayer');
const express = require('express');

// WEB SERVER: Keeps Render happy
const app = express();
const port = 10000; 

app.get('/', (req, res) => res.send('MambaBot is Online'));
app.listen(port, () => console.log(`Server active on port ${port}`));

// BOT CONFIG: The specific 1.21.11 setup that worked
const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: '1.21.11',
    checkTimeoutInterval: 60000
};

let bot;

function createBot() {
    console.log('--- MAMBA ENTRANCE ATTEMPT ---');
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('SUCCESS: Bot is in the server!');
        
        // SIMPLE JUMP: Every 30 seconds to stay active
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    bot.on('error', (err) => console.log('ERROR:', err.message));
    bot.on('kicked', (reason) => console.log('KICKED:', reason));

    bot.on('end', () => {
        console.log('Bot disconnected. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });
}

createBot();

createBot();
