const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('MambaBot is Awake!'));
app.listen(3000, () => console.log('Web server on port 3000'));

const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me',
    port: 27024,
    username: 'MambaBot',
    version: '1.21.1',
    // These two lines are crucial for 1.21.1 servers
    checkTimeoutInterval: 60 * 1000, 
    hideErrors: false 
};

function createBot() {
    bot = mineflayer.createBot(botArgs);

    // This helps debug why the bot isn't showing up
    bot.on('error', (err) => console.log('CONNECTION ERROR:', err.message));
    bot.on('kicked', (reason) => console.log('KICKED REASON:', reason));

    bot.on('login', () => {
        console.log('SUCCESS: Bot is in the server!');
        
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

    bot.on('end', () => {
        console.log('Bot disconnected. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });
}
