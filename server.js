const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(cors());

const corsOptions = {
  origin: 'https://li2thx.github.io',
  // за потреби додайте інші опції, наприклад optionsSuccessStatus: 200
};

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

app.get('/', (req, res) => {
  res.send('Сервер працює. Для отримання посилання перейдіть на /get-invite');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
