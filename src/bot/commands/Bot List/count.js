const Bots = require("@models/bots");
const { MessageEmbed } = require('discord.js');

  module.exports = {
    name: 'count',
    description: 'Check how many bots there are in the list',
    cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL

  run :async (message) => {
    let bots = await Bots.find({}, { _id: false })
    bots = bots.filter(bot => bot.state !== "deleted");
    
    message.channel.send(`There are \`${bots.length}\` bots in the list`)
  }
};
