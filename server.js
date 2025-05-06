const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const bot = new TelegramBot(TOKEN, { polling: false });

app.get('/get-invite', async (req, res) => {
  try {
    const invite = await bot.createChatInviteLink(CHAT_ID, {
      expire_date: Math.floor(Date.now() / 1000) + 3600,
      member_limit: 1
    });
    res.json({ link: invite.invite_link });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Помилка створення посилання' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
