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
    console.log('--- ATTEMPTING TO CONNECT ---');
    bot = mineflayer.createBot(botArgs);

    // This will log if the bot is stuck at the loading screen
    bot.on('inject_allowed', () => console.log('Checking server version...'));
    
    bot.on('login', () => {
        console.log('SUCCESS: Bot is in the server!');
        // Your jump code here
    });

    bot.on('error', (err) => {
        console.log('CRITICAL ERROR:', err.message);
    });

    bot.on('kicked', (reason) => {
        console.log('KICKED BY SERVER:', reason);
    });

    bot.on('end', () => {
        console.log('Connection closed. Retrying in 30s...');
        setTimeout(createBot, 30000);
    });
}

// Call it once to start
createBot();
