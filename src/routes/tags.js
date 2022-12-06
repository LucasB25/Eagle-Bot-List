const { Router } = require("express");
const getList = require('@utils/getList');

const route = Router();

route.get("/", async (req, res) => {
    const bots = await getList()
    const Music = bots.filter(b => b.tags !== null && b.tags.includes('Music')).length
    const Moderation = bots.filter(b => b.tags !== null && b.tags.includes('Moderation')).length
    const Fun = bots.filter(b => b.tags !== null && b.tags.includes('Fun')).length
    const Economy = bots.filter(b => b.tags !== null && b.tags.includes('Economy')).length
    const Anime = bots.filter(b => b.tags !== null && b.tags.includes('Anime')).length
    const Games = bots.filter(b => b.tags !== null && b.tags.includes('Games')).length
    const Meme = bots.filter(b => b.tags !== null && b.tags.includes('Meme')).length
    const Social = bots.filter(b => b.tags !== null && b.tags.includes('Social')).length
    const Leveling = bots.filter(b => b.tags !== null && b.tags.includes('Leveling')).length
    const Roleplay = bots.filter(b => b.tags !== null && b.tags.includes('Roleplay')).length
    const Role_Managment = bots.filter(b => b.tags !== null && b.tags.includes('Role Managment')).length
    const Logging = bots.filter(b => b.tags !== null && b.tags.includes('Logging')).length
    const Web_Dashboard = bots.filter(b => b.tags !== null && b.tags.includes('Web Dashboard')).length
    const Utility = bots.filter(b => b.tags !== null && b.tags.includes('Utility')).length
    const Stream = bots.filter(b => b.tags !== null && b.tags.includes('Stream')).length
    const Youtube = bots.filter(b => b.tags !== null && b.tags.includes('Youtube')).length
    const Twitch = bots.filter(b => b.tags !== null && b.tags.includes('Twitch')).length
    const Reddit = bots.filter(b => b.tags !== null && b.tags.includes('Reddit')).length
    const Music247 = bots.filter(b => b.tags !== null && b.tags.includes('24-7 Music')).length
    const Community = bots.filter(b => b.tags !== null && b.tags.includes('Community')).length
    const Multipurpose = bots.filter(b => b.tags !== null && b.tags.includes('Multipurpose')).length
    const Giveaways = bots.filter(b => b.tags !== null && b.tags.includes('Giveaways')).length
    const nsfw = bots.filter(b => b.tags !== null && b.tags.includes('NSFW')).length
    const Statistics = bots.filter(b => b.tags !== null && b.tags.includes('Statistics')).length
    const Customizable = bots.filter(b => b.tags !== null && b.tags.includes('Customizable')).length
    const Minecraft = bots.filter(b => b.tags !== null && b.tags.includes('Minecraft')).length
    const Pokemon = bots.filter(b => b.tags !== null && b.tags.includes('Pokemon')).length
    const Tickets = bots.filter(b => b.tags !== null && b.tags.includes('Tickets')).length

    res.render("tags", {req, Music, Moderation, Fun, Economy, Anime, Games, Meme, Social, Leveling, Roleplay, Role_Managment, Logging, Web_Dashboard, Utility, Stream, Youtube,
    Twitch, Reddit, Music247, Community, Multipurpose, Giveaways, nsfw, Statistics, Customizable, Minecraft, Pokemon, Tickets})
});

module.exports = route;