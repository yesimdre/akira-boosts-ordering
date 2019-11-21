const Discord = require("discord.js");

module.exports = {
  config: {
    name: "useradd",
    description: "Adds another User to an open ticket",
    usage: "-useradd",
    category: "moderation",
    accessableby: "Admins",
    aliases: ["ua", "uadd"]
  },
  run: async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Sorry, but you do not have permission to do that!");
    if (!message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't add another User to a order channel!`);
    let Member = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if (!Member) return message.channel.send("Please mention a User to be added! (if you need help go to a channel the user has access to... Right-Click their name and Click Mention)")


    if (message.channel.permissionsFor(Member).has('VIEW_CHANNEL')) {
      message.channel.bulkDelete(1);
      message.channel.send(`${Member.user.username} is already attached to the order!`).then(m => m.delete(7000));
    } else {
      message.channel.overwritePermissions(Member, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      });
      message.channel.bulkDelete(1);
      message.channel.send(`:white_check_mark: ${Member.user.username} has been added to the order`)

    }
  }
}