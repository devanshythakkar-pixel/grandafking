const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = 10000; 
app.get('/', (req, res) => res.send('MambaBot Training Facility: ACTIVE'));
app.listen(port, () => console.log(`Web server active on port ${port}`));

const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: '1.21.11',
    hideErrors: false,
    // CRITICAL: Increased timeout for Aternos/Purpur lag
    connectTimeout: 60000,
    checkTimeoutInterval: 120000 
};

let bot;
const wait = (ms) => new Promise(res => setTimeout(res, ms));

function createBot() {
    console.log('--- MAMBA ENTRANCE ATTEMPT ---');
    bot = mineflayer.createBot(botArgs);

    // Helps the bot load faster by disabling physics during login
    bot.on('login', () => {
        console.log('Bot logged in, waiting to spawn...');
        bot.physicsEnabled = false; 
    });

    bot.on('spawn', async () => {
        console.log('SUCCESS: MambaBot is on the court!');
        bot.physicsEnabled = true; // Re-enable physics once spawned
        
        if (bot.moveInterval) clearInterval(bot.moveInterval);
        bot.moveInterval = setInterval(async () => {
            console.log('Executing movement drill...');
            try {
                bot.setControlState('forward', true); await wait(700); bot.setControlState('forward', false);
                bot.setControlState('back', true); await wait(700); bot.setControlState('back', false);
                bot.setControlState('jump', true); await wait(200); bot.setControlState('jump', false);
                console.log('Drill complete.');
            } catch (err) { console.log('Drill error:', err.message); }
        }, 60000); 
    });

    bot.on('kicked', (reason) => console.log('KICKED:', reason));
    bot.on('error', (err) => console.log('ERROR:', err.message));
    bot.on('end', () => {
        console.log('Bot left. Rejoining in 30s...');
        if (bot.moveInterval) clearInterval(bot.moveInterval);
        setTimeout(createBot, 30000);
    });
}

createBot();
