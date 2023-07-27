require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const bot = new Telegraf(process.env.WAGMI_TELEGRAM_BOT_TOKEN);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the WAGMI telegram bot. \nI respond to /ethereum. Please try it."
  );
});

bot.command("ethereum", (ctx) => {
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  )
    .then((res) => res.json())
    .then((data) => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `Hello, today the ethereum price is ${data.ethereum.usd}USD`
      );
    });
});

bot.launch();

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
