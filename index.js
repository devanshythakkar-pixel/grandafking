const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('MambaBot is Online')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

const botArgs = {
  host: 'Chaos_SMP-tHvy.aternos.me',
  port: 27024,
  username: 'MambaBot',
  version: '1.21.1' 
}

let bot

function createBot() {
  bot = mineflayer.createBot(botArgs)

  bot.on('login', () => {
    console.log('SUCCESS: Bot is in the server!')
    
    setInterval(() => {
      console.log('Bot is performing 4 jumps...')
      let jumps = 0
      const jumpInterval = setInterval(() => {
        bot.setControlState('jump', true)
        bot.setControlState('jump', false)
        jumps++
        if (jumps >= 4) clearInterval(jumpInterval)
      }, 500)
    }, 20000)
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Retrying...')
    setTimeout(createBot, 30000)
  })

  // Basic error catch to prevent the script from crashing
  bot.on('error', (err) => console.log(err))
}

createBot()

createBot();
