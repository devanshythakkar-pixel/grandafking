const mineflayer = require('mineflayer');
const express = require('express');

// 1. WEB SERVER: Keeps Render alive
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('MambaBot is Online and Training!');
});

app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});

// 2. BOT CONFIGURATION
const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me', 
    port: 27024, 
    username: 'MambaBot', 
    version: '1.21.11', // The exact version Purpur requested
    checkTimeoutInterval: 60000
};

let bot;

// Helper to handle movement timing
const wait = (ms) => new Promise(res => setTimeout(res, ms));

function createBot() {
    console.log('--- ATTEMPTING TO CONNECT ---');
    bot = mineflayer.createBot(botArgs);

    // 3. THE MAMBA DRILL: Movement logic
    bot.on('spawn', async () => {
        console.log('SUCCESS: MambaBot is on the court!');
        
        // Prevent multiple intervals if the bot respawns
        if (bot.moveInterval) clearInterval(bot.moveInterval);

        bot.moveInterval = setInterval(async () => {
            console.log('Starting Mamba movement drill...');
            try {
                // Move Front
                bot.setControlState('forward', true); 
                await wait(800); 
                bot.setControlState('forward', false);

                // Move Back
                bot.setControlState('back', true); 
                await wait(800); 
                bot.setControlState('back', false);

                // Move Left
                bot.setControlState('left', true); 
                await wait(800); 
                bot.setControlState('left', false);

                // Move Right
                bot.setControlState('right', true); 
                await wait(800); 
                bot.setControlState('right', false);

                // The Jump
                bot.setControlState('jump', true);
                await wait(200);
                bot.setControlState('jump', false);

                console.log('Drill complete. Resting for 60s.');
            } catch (err) {
                console.log('Movement error:', err.message);
            }
        }, 60000); // Runs every 60 seconds
    });

    // 4. ERROR HANDLING & AUTO-RECONNECT
    bot.on('kicked', (reason) => {
        console.log('KICKED BY SERVER:', reason);
    });

    bot.on('error', (err) => {
        console.log('CRITICAL ERROR:', err.message);
    });

    bot.on('end', () => {
        console.log('Connection closed. Retrying in 60s...');
        // Clears movement interval and tries again in 1 minute
        if (bot.moveInterval) clearInterval(bot.moveInterval);
        setTimeout(createBot, 60000);
    });
}

// Start the bot
createBot();
