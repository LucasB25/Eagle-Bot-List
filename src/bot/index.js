const { Client, Intents } = require("discord.js");
const Bots = require("@models/bots");

const client = new Client({ intents: [32381] });

//Bot Status

client.once("ready", async () => {
  let bots = await Bots.find({}, { _id: false });
  bots = bots.filter((bot) => bot.stats !== "deleted");
  client.user.setActivity(`bots ${bots.length} `, { type: "WATCHING" });
});

module.exports.init = async (token) => {
  client.userBaseDirectory = __dirname;
  await client.login(token);
  return client;
};
