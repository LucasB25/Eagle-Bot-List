const { User } = require('discord.js');
const Bots = require("@models/bots");
const Users = require("@models/users");
const { server: { mod_log_id, role_ids, admin_user_ids} } = require("@root/config.json");
var modLog;

module.exports = {
	name: 'blacklist',
	description: 'Blacklists or un-blacklists users and guilds from the bot.',
	usage: '<user:user|guild:guild|guild:str> [...]',
	dir: "Developer",
	cooldown: 2, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
} 
this.terms = ['usersAdded', 'usersRemoved', 'guildsAdded', 'guildsRemoved'];

	run :async (message, usersAndGuilds) => {
		const changes = [[], [], [], []];
		const queries = [[], []];

		for (const userOrGuild of new Set(usersAndGuilds)) {
			const type = userOrGuild instanceof User ? 'user' : 'guild';
			if (
				this.client.settings
					.get(`${type}Blacklist`)
					.includes(userOrGuild.id || userOrGuild)
			) {
				changes[this.terms.indexOf(`${type}sRemoved`)].push(
					userOrGuild.name || userOrGuild.username || userOrGuild
				);
			} else {
				changes[this.terms.indexOf(`${type}sAdded`)].push(
					userOrGuild.name || userOrGuild.username || userOrGuild
				);
			}
			queries[Number(type === 'guild')].push(userOrGuild.id || userOrGuild);
		}

		const { errors } = await this.client.settings.update([
			['userBlacklist', queries[0]],
			['guildBlacklist', queries[1]]
		]);
		if (errors.length) throw String(errors[0]);

		return message.channel.send("BLACKLIST_SUCCESS", changes);
	}


