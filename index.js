const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('MambaBot is Awake!'));
app.listen(3000, () => console.log('Web server on port 3000'));

const botArgs = {
    host: 'Chaos_SMP-tHvy.aternos.me',
    port: 27024,
    username: 'MambaBot',
    version: '1.21.11', // Update this to match the server exactly
    connectTimeout: 30000, // Give it 30 seconds to "shake hands"
    hideErrors: false
};
function createBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('SUCCESS: MambaBot is on the court!');
        
        if (bot.moveInterval) clearInterval(bot.moveInterval);

        bot.moveInterval = setInterval(async () => {
            console.log('Starting Mamba movement drill...');
            
            // 1. Move Forward for 1 second
            bot.setControlState('forward', true);
            await new Promise(r => setTimeout(r, 1000));
            bot.setControlState('forward', false);

            // 2. Move Backward for 1 second
            bot.setControlState('back', true);
            await new Promise(r => setTimeout(r, 1000));
            bot.setControlState('back', false);

            // 3. Move Left for 1 second
            bot.setControlState('left', true);
            await new Promise(r => setTimeout(r, 1000));
            bot.setControlState('left', false);

            // 4. Move Right for 1 second
            bot.setControlState('right', true);
            await new Promise(r => setTimeout(r, 1000));
            bot.setControlState('right', false);

            // 5. The Jump
            bot.setControlState('jump', true);
            bot.setControlState('jump', false);
            
            console.log('Drill complete. Resting for 60s.');
        }, 60000); // Runs every 60 seconds
    });

    bot.on('error', (err) => console.log('ERROR:', err.message));
    bot.on('kicked', (reason) => console.log('KICKED:', reason));
}
