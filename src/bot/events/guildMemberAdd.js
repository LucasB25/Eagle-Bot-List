const { server: {role_ids} } = require("@root/config.json");

module.exports = (client, member) => {
        if (member.user.bot) {
            member.roles.add(member.guild.roles.cache.get(role_ids.bot));
            member.roles.add(member.guild.roles.cache.get(role_ids.unverified));
        }
    }
