const { Client, Collection, Intents } = require("discord.js");
const Bots = require("@models/bots");
const {server: {role_ids: {bot_verifier}}, discord_client: {prefix}} = require("@root/config.json");

//Client.defaultPermissionLevels //todo: PermissionLevels
    //.add(8, ({ guild, member }) => member.roles.cache.has(bot_verifier));

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
});

//Bot Status

client.once('ready', async () => {
    let bots = await Bots.find({}, { _id: false })
    bots = bots.filter(bot => bot.stats !== "deleted");
    client.user.setActivity(`bots ${bots.length} `, { type: "WATCHING" });
});

module.exports.init = async (token) => {
    client.userBaseDirectory = __dirname;
    await client.login(token);
    return client;
}
