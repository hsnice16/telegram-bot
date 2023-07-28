require("dotenv").config();
const { Telegraf } = require("telegraf");
const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const bot = new Telegraf(process.env.WAGMI_TELEGRAM_BOT_TOKEN);
app.use(bot.webhookCallback("/secret-path"));
bot.telegram.setWebhook("https://wagmi-telegram-bot.onrender.com/secret-path");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the WAGMI telegram bot. \nI respond to /ethereum. Please try it."
  );
});

bot.command("ethereum", async (ctx) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  );

  bot.telegram.sendMessage(
    ctx.chat.id,
    `Hello, today the ethereum price is ${data.ethereum.usd}USD`
  );
});

// bot.launch();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
