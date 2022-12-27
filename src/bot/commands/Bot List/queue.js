const { MessageEmbed } = require("discord.js");
const Bots = require("@models/bots");

const {
  server: { id },
} = require("@root/config.json");

module.exports = {
  name: "queue",
  description: "Get the queue list of Bot List",
  usage: "[User:user]",
  cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL

  run: async (message) => {
    let cont = "";
    let bots = await Bots.find({ state: "unverified" }, { _id: false });

    bots.forEach((bot) => {
      cont += `● **Owner: <@${bot.owners.primary}>** - <@${bot.botid}> [Invite to Test](https://discord.com/oauth2/authorize?client_id=${bot.botid}&scope=bot%20applications.commands&guild_id=${id}&permissions=0)\n`;
    });
    if (bots.length === 0)
      cont = "```Oops! It seems like nobody applied a new bot!```";

    let embed = new MessageEmbed()

      .setAuthor({
        name: `${message.author.tag} here is the botlist queue`,
        iconURL: message.author.displayAvatarURL({ format: "png", size: 256 }),
      })
      .setColor("ORANGE")
      .setDescription(cont);
    message.channel.send(embed);
  },
};
