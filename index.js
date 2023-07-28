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
    "Hello there! Welcome to the WAGMI telegram bot. \nI respond to /joke. Please try it."
  );
});

bot.command("joke", async (ctx) => {
  const { data } = await axios.get(
    `https://official-joke-api.appspot.com/jokes/random`
  );

  bot.telegram.sendMessage(
    ctx.chat.id,
    `**${data.setup}**\n\n${
      typeof data.punchline === "string"
        ? data.punchline.replaceAll(".", "\\.")
        : data.punchline
    }`,
    { parse_mode: "MarkdownV2" }
  );
});

// bot.launch();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
