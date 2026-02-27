require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const MEU_ID = '1426750282905419826';
const MOD_CARGOS = ["Dono", "Moderador", "Botdelay2"];

let jogoAtual = "Nenhum jogo definido";

client.on("ready", () => {
  console.log(`Bot ligado como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!jogo") {
    message.channel.send(`🎮 Jogo atual: ${jogoAtual}`);
  }

  if (message.content.startsWith("!setjogo ")) {
    const membro = message.member;

    const podeAlterar =
      membro.id === MEU_ID ||
      membro.roles.cache.some(r => MOD_CARGOS.includes(r.name));

    if (!podeAlterar) {
      message.channel.send("❌ Você não tem permissão.");
      return;
    }

    const novoJogo = message.content.slice(8).trim();
    if (!novoJogo) return;

    jogoAtual = novoJogo;
    client.user.setActivity(jogoAtual);

    message.channel.send(`✅ Jogo atualizado para: ${novoJogo}`);
  }
});

// Servidor Express necessário para Render
app.get('/', (req, res) => {
  res.send('Bot online!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor Express rodando');
});

// 🔥 LOGIN COM DEBUG
console.log("Token existe?", !!process.env.TOKEN);

client.login(process.env.TOKEN)
  .then(() => console.log("Login feito com sucesso"))
  .catch(err => console.error("Erro ao logar:", err));