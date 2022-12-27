const { MessageEmbed } = require("discord.js");
const Bots = require("@models/bots");
const Users = require("@models/users");
const {
  server: { mod_log_id, role_ids, admin_user_ids },
} = require("@root/config.json");
const perms = require("@root/config.json");
var modLog;

module.exports = {
  name: "certify",
  description: "Certify a bot",
  usage: "[User:user]",
  cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL

  run: async (message, [user]) => {
    if (!perms.server.botreviewer.includes(message.author.id))
      return message.channel.send({
        embed: {
          color: "RED",
          description: `${message.author}, You do not have enough permissions to run this command.`,
        },
      });
    if (!user || !user.bot) return message.channel.send(`Ping a **bot**.`);
    let bot = await Bots.findOne({ botid: user.id }, { _id: false });

    if (bot === null)
      return message.channel.send({
        embed: {
          color: "RED",
          thumpbnail: message.guild.iconURL,
          description: `This bot is not on our botlist`,
        },
      });

    if (bot.certify === true)
      return message.channel.send({
        embed: {
          color: "RED",
          description: `${message.author}, \`${bot.username}\` is already certify`,
        },
      });
    const botUser = await this.client.users.fetch(user.id);
    if (bot.logo !== botUser.displayAvatarURL({ format: "png", size: 256 }))
      await Bots.updateOne(
        { botid: user.id },
        {
          $set: {
            certify: true,
            logo: botUser.displayAvatarURL({ format: "png", size: 256 }),
          },
        }
      );
    else await Bots.updateOne({ botid: user.id }, { $set: { certify: true } });

    let owners = [bot.owners.primary].concat(bot.owners.additional);
    let e = new MessageEmbed()
      .setTitle("Bot Certified")
      .setURL(`http://localhost/bots/${bot.botid}`)
      .addFields(
        { name: "Bot", value: `<@${bot.botid}>`, inline: true },
        {
          name: `Owner(s)`,
          value: owners.map((x) => (x ? `<@${x}>` : "")),
          inline: true,
        },
        { name: "Reviewer", value: `<@${message.author.tag}>`, inline: true }
      )
      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setColor("#ff9800")
      .setColor(0x26ff00);
    modLog.send(e);
    modLog.send(owners.map((x) => (x ? `<@${x}>` : ""))).then((m) => {
      m.delete();
    });
    owners = await message.guild.members.fetch({ user: owners });
    owners.forEach((o) => {
      Users.updateOne({ userid: o.id }, { $set: { certdev: true } }).then();
      o.roles.add(message.guild.roles.cache.get(role_ids.cert_user));
      o.send(
        `Your bot \`${bot.username}\` / <@${bot.botid}> has been certified! :tada:.`
      );
    });
    message.guild.members
      .fetch(message.client.users.cache.find((u) => u.id === bot.botid))
      .then((bot) => {
        bot.roles.set([role_ids.cert_bot, role_ids.bot]);
      });
    message.channel.send(`Certified \`${bot.username}\``);
  },
  async init() {
    modLog = this.client.channels.cache.get(mod_log_id);
  },
};
