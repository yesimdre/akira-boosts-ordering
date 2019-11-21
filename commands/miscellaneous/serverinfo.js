const Discord = require("discord.js")
const colors = require("../../colors.json");


module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "serverinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si", "serverdesc"]
    },

    run: async (bot, message, args) => {
        let sEmbed = new Discord.RichEmbed()
            .setColor(colors.cyan)
            .setTitle("Server Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`, true)
            .addField("**Guild Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            .setFooter(`${message.guild.name}`, bot.user.displayAvatarURL);

        message.channel.send({ embed: sEmbed });

    }

}
