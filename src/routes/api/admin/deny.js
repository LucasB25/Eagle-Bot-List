const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const Bots = require("@models/bots");
const { MessageEmbed } = require("discord.js");
const route = Router();

const {
  server: { id, mod_log_id },
} = require("@root/config.json");

route.post("/:id", auth, async function (req, res) {
  if (!req.user.staff)
    return res.json({ success: false, message: "Forbidden" });

  // Check bot exists
  const bot = await Bots.findOne(
    { state: "unverified", botid: req.params.id },
    { _id: false }
  );
  if (!bot) return res.json({ success: false, message: "Bot not found" });

  let { reason } = req.body;

  // Update bot in database
  let botUser = await req.app.get("client").users.fetch(req.params.id);
  await Bots.updateOne(
    { botid: req.params.id },
    {
      $set: {
        state: "deleted",
        likes: 0,
        servers: [],
        note: undefined,
        logo: botUser.displayAvatarURL({ format: "png", size: 256 }),
      },
    }
  );

  // Send messages
  let owners = [bot.owners.primary].concat(bot.owners.additional);
  let modLog = await req.app.get("client").channels.cache.get(mod_log_id);
  modLog.send(
    new MessageEmbed()
      .setTitle("Bot Denied")
      .addFields(
        { name: "Bot", value: `<@${bot.botid}>`, inline: true },
        {
          name: `Owner(s)`,
          value: `${owners.map((x) => (x ? `<@${x}>` : ""))}`,
          inline: true,
        },
        {
          name: `Reviewer`,
          value: `<@${req.user.id}>`,
          inline: true,
        },
        { name: "Reason", value: reason, inline: true }
      )
      .setThumbnail(botUser.displayAvatarURL({ format: "png", size: 256 }))
      .setTimestamp()
      .setColor("e03c3d")
  );
  modLog.send(owners.map((x) => (x ? `<@${x}>` : ""))).then((m) => {
    m.delete();
  });

  // Update developer roles and send DM
  owners = await req.app
    .get("client")
    .guilds.cache.get(id)
    .members.fetch({ user: owners });
  owners.forEach((o) => {
    o.send(`Your bot <@${bot.botid}> has been removed:\n>>> ${reason}`);
  });

  // Kick bot
  req.app
    .get("client")
    .guilds.cache.get(id)
    .members.fetch(req.params.id)
    .then((member) => {
      if (member) member.kick();
    })
    .catch((_) => {});

  return res.json({ success: true });
});

module.exports = route;
