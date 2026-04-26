const mineflayer = require('mineflayer');
const express = require('express');

// 1. WEB SERVER: Fixed to Port 10000 for Render stability
const app = express();
const port = 10000; 

app.get('/', (req, res) => res.send('MambaBot Training Facility: ACTIVE'));
app.listen(port, () => console.log(`Web server active on port ${port}`));

// 2. BOT CONFIGURATION: Locked to 1.21.11
const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: '1.21.11',
    hideErrors: false,
    checkTimeoutInterval: 90000 // Extra time for Aternos lag
};

let bot;
const wait = (ms) => new Promise(res => setTimeout(res, ms));

function createBot() {
    console.log('--- MAMBA ENTRANCE ATTEMPT ---');
    bot = mineflayer.createBot(botArgs);

    // 3. THE TRAINING DRILL (Movement)
    bot.on('spawn', async () => {
        console.log('SUCCESS: MambaBot is on the court!');
        
        if (bot.moveInterval) clearInterval(bot.moveInterval);

        bot.moveInterval = setInterval(async () => {
            console.log('Executing movement drill...');
            try {
                // Front-Back-Left-Right Box Drill
                bot.setControlState('forward', true); await wait(700); bot.setControlState('forward', false);
                bot.setControlState('back', true); await wait(700); bot.setControlState('back', false);
                bot.setControlState('left', true); await wait(700); bot.setControlState('left', false);
                bot.setControlState('right', true); await wait(700); bot.setControlState('right', false);
                
                // Jump to prevent AFK kick
                bot.setControlState('jump', true); await wait(200); bot.setControlState('jump', false);
                
                console.log('Drill complete. Resting.');
            } catch (err) { console.log('Drill error:', err.message); }
        }, 60000); 
    });

    // 4. AUTO-RECONNECT LOGIC (The "Never Quit" Clause)
    bot.on('kicked', (reason) => console.log('KICKED:', reason));
    bot.on('error', (err) => console.log('ERROR:', err.message));

    bot.on('end', () => {
        console.log('Bot left. Rejoining in 60s...');
        if (bot.moveInterval) clearInterval(bot.moveInterval);
        setTimeout(createBot, 60000);
    });
}

createBot();
