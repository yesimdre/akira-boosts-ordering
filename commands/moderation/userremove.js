const Discord = require("discord.js");


module.exports = {
  config: {
    name: "userremove",
    description: "Removes a specific user from the ticket",
    usage: "-userremove",
    accessableby: "Admins",
    category: "moderation",
    aliases: ["ur", "urem", "remuser"]
  },
  run: async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Sorry, but you do not have permission to do that!");
    if (!message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't add another user to a order channel!`);
    let Member = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if (!Member) return message.channel.send("Please mention a user to be removed!")


    if (message.channel.permissionsFor(Member).has('VIEW_CHANNEL')) {
      message.channel.overwritePermissions(Member, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
      });
      message.channel.bulkDelete(1);
      message.channel.send(`:white_check_mark: ${Member.user.username} has been removed from the order`)

    } else {
      message.channel.bulkDelete(1);
      message.channel.send(`${Member.user.username} is not attached to the order!`).then(m => m.delete(7000));
    }
  }
}
