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
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 20000)
  })

  bot.on('end', () => {
    setTimeout(createBot, 30000)
  })

  bot.on('error', (err) => {})
}

createBot()
