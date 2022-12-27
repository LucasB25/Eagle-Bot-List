module.exports = {
  name: "help",
  aliases: ["commands", "cmd", "cmds"],
  description: "Display help for a command.",
  usage: "(Command:command)",
  cooldown: 1,

  run: async (message, [command], args) => {
    message.channel.send({
      embed: {
        color: "RED",
        fields: [
          {
            name: "Info Commands",
            value: "`bots`, `botinfo`, `queue`, `count`, `help`.",
          },
          {
            name: "Staff Commands",
            value: "`approve`, `certify`, `uncertify`, `update`, `blacklist`.",
          },
        ],
      },
    });
  },
};
