const { Router } = require("express");
const { auth } = require("@utils/discordApi");
const create = require('@utils/createAuth.js');
const Bots = require("@models/bots");
const { MessageEmbed } = require("discord.js");
const Users = require("@models/users");

const { server } = require("@root/config.json");

const route = Router();

route.get("/:id", auth, async (req, res) => {
 
  const bot = await Bots.findOne({ botid: req.params.id }, { _id: false })
  if (!bot) return res.json({ "success": "false", "error": "Bot not found." });
  if (![bot.owners.primary].concat(bot.owners.additional).includes(req.user.id) && !admin_user_ids.includes(req.user.id)) return res.json({ "success": false, "error": "Bot owner is not user." });
  if (!bot.auth) {
    let newAuthCode = create(20);
    await Bots.updateOne({ botid: bot.botid }, { $set: { auth: newAuthCode } })
    res.json({ "success": true, "auth": newAuthCode });
  } else {
    res.json({ "success": true, "auth": bot.auth });
  }
});


module.exports = route;
