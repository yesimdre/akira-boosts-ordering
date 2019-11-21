const Discord = require("discord.js");

module.exports = {
  config: {
    name: "pay",
    description: "Generates a pay link",
    usage: "-pay <amount>",
    category: "moderation",
    accessableby: "Admins",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, but you do not have permission to do that!");
    if (!message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't add another role to a order channel!`);
    var noAmount = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription("You did not specify an amount to pay!")
    var invalidAmount = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription("That isn't a number!")

    var args = message.content.substr(1).split(" ").slice(1)[0]
    if (!args) return message.channel.send(noAmount)
    if (isNaN(args)) return message.channel.send(invalidAmount)
    var amount = args;

    function between(x, min, max) {
        return x >= min && x <= max;
      }

    function feeCalculator(amount) {
        if (between(amount, 1, 99)) {
            var float = parseInt(amount)
            float = float * (1 + 0.05)
            var add30 = float + 0.30
            return add30
        } else if (amount >= 100) {
            var bro = parseInt(amount)
            bro = bro * (1 + 0.1)
            var add30c = bro + 0.30
            return add30c
        }
    }

    var feeCalc = feeCalculator(amount)
    var fixed = feeCalc.toFixed(2)
    var finalAmount = fixed

    var pay = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTitle("PayPal")
    .setDescription(`You have to pay $${amount}\n[Click here to pay](https://www.paypal.me/akiraboosts/${amount})`);
    await message.channel.send(pay);
  }
}
