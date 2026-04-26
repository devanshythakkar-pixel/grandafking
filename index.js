const mineflayer = require('mineflayer');
const express = require('express');

// 1. THE WEB SERVER (The original Port 3000)
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('MambaBot Training Facility: ACTIVE');
});

app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});

// 2. BOT CONFIGURATION
const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me',
    port: 27024,
    username: 'MambaBot',
    version: '1.21.1', // The version we used when he first joined
    checkTimeoutInterval: 60 * 1000
};

let bot;

function createBot() {
    console.log('--- MAMBA ENTRANCE ATTEMPT ---');
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('SUCCESS: Bot is in the server!');
        
        // THE JUMP ROUTINE: Every 20 seconds
        setInterval(() => {
            console.log('Bot is performing 4 jumps...');
            let jumps = 0;
            const jumpInterval = setInterval(() => {
                bot.setControlState('jump', true);
                bot.setControlState('jump', false);
                jumps++;
                if (jumps >= 4) clearInterval(jumpInterval);
            }, 500);
        }, 20000);
    });

    // RECONNECT LOGIC
    bot.on('error', (err) => console.log('ERROR:', err.message));
    bot.on('kicked', (reason) => console.log('KICKED:', reason));
    
    bot.on('end', () => {
        console.log('Bot disconnected. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });
}

createBot();
