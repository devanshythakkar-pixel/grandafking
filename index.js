const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('MambaBot is Awake!'));
app.listen(3000, () => console.log('Web server on port 3000'));

const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: "1.21.1" // Set this to exactly 1.21.1 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('SUCCESS: Bot is in the server!');
        
        // This runs every 20 seconds (20,000 milliseconds)
        setInterval(() => {
            console.log('Bot is performing 4 jumps...');
            
            let jumps = 0;
            const jumpInterval = setInterval(() => {
                bot.setControlState('jump', true);
                bot.setControlState('jump', false);
                jumps++;

                if (jumps >= 4) {
                    clearInterval(jumpInterval);
                }
            }, 500); // Wait 0.5 seconds between each jump so they look real
            
        }, 20000); 
    });

    bot.on('end', () => {
        console.log('Bot disconnected. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => console.log('Error Type:', err.code));
}
