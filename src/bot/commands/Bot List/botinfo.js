const { MessageEmbed } = require("discord.js");
const Bots = require("@models/bots");
const {
  web: { domain_with_protocol },
} = require("@root/config.json");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "Get bot information",
  usage: "[User:user]",
  cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL

  run: async (message, [user]) => {
    if (!user || !user.bot)
      return message.channel.send(`Please include a bot mention or ID`);
    if (user.id === message.client.user.id)
      return message.channel.send(`Bot not found.`);

    const bot = await Bots.findOne({ botid: user.id }, { _id: false });
    if (!bot) return message.channel.send(`Bot not found.`);
    let servers;
    if (bot.servers[bot.servers.length - 1])
      servers = bot.servers[bot.servers.length - 1].count;
    else servers = null;
    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne(
        { botid: user.id },
        {
          $set: {
            logo: botUser.displayAvatarURL({ format: "png", size: 256 }),
          },
        }
      );
    let e = new MessageEmbed();

    e.setColor("ORANGE");
    e.setAuthor({
      name: bot.username,
      iconURL: botUser.displayAvatarURL({ format: "png", size: 256 }),
      url: bot.invite,
    });
    e.setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }));

    e.setDescription(
      `[${bot.description}](${domain_with_protocol}/bots/${bot.botid})`
    );
    e.addFields(
      {
        name: "Bot ID",
        value: !bot.botid ? "Unknown" : bot.botid,
        inline: true,
      },
      {
        name: `Bot Owner`,
        value: `<@${bot.owners.primary}>`,
        inline: true,
      },
      {
        name: "Prefix",
        value: bot.prefix ? bot.prefix : "Unknown",
        inline: true,
      },
      {
        name: "Votes",
        value: `${bot.likes || 0} Likes`,
        inline: true,
      },
      {
        name: `[+] Invite the Bot`,
        value: `[Click Here](${bot.invite})`,
        inline: true,
      },
      {
        name: "Certified",
        value: !bot.certify ? "False" : "True",
        inline: true,
      },
      {
        name: "Github",
        value: !bot.github ? "Not Set" : `[Click Here](${bot.github})`,
        inline: true,
      },
      {
        name: `Donation`,
        value: !bot.donation ? "Not Set" : `[Click Here](${bot.donation})`,
        inline: true,
      },
      {
        name: "Website",
        value: !bot.website ? "Not Set" : `[Click Here](${bot.website})`,
        inline: true,
      },
      {
        name: "Support Server",
        value: !bot.support ? "Not Set" : `[Click Here](${bot.support})`,
        inline: true,
      },
      {
        name: `Bot Joined BotList`,
        value: moment(bot.addedAt).format("lll"),
        inline: true,
      },
      {
        name: "Bot Created",
        value: moment(user.createdAt).format("lll"),
        inline: true,
      },
      {
        name: "\u200b",
        value: `\u200b`,
        inline: true,
      }
    );
    message.channel.send(e);
  },
};
