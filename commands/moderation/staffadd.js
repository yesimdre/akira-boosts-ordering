const Discord = require("discord.js");

module.exports = {
  config: {
    name: "staffadd",
    description: "Adds another staff rank to an open ticket",
    usage: "-staffadd",
    category: "moderation",
    accessableby: "Admins",
    aliases: ["sa", "sadd"]
  },
  run: async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Sorry, but you do not have permission to do that!");
    if (!message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't add another role to a order channel!`);
    let role = message.guild.roles.find(r => r.name == args[0]) || message.guild.roles.find(r => r.id == args[0]) || message.mentions.roles.first()
    if (!role) return message.channel.send("Please mention a role to be added!")


    if (message.channel.permissionsFor(role).has('VIEW_CHANNEL')) {
      message.channel.bulkDelete(1);
      message.channel.send(`${role} is already attached to the order!`).then(m => m.delete(7000));
    } else {
      message.channel.overwritePermissions(role, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      });
      message.channel.bulkDelete(1);
      message.channel.send(`:white_check_mark: ${role.name} has been added to the order`)

    }
  }
}
