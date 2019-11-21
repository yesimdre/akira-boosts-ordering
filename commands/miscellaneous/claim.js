module.exports = {
    config: {
        name: "claim",
        description: "Claims an opened ticket.",
        usage: "-claim",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        message.delete();
        if (!message.member.roles.has("644664589551927356")) return message.reply("Sorry, but you do not have permission to do that!");
        if (message.channel.name.startsWith(`order-`)) {
            let role2 = message.guild.roles.find(role => role.id === "644664589551927356");
            message.channel.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            message.channel.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
        message.channel.send(`This order was claimed by: ${message.author}`)
        }
        else {
            return message.channel.send(`You can't use the claim command outside of a order channel.`);
        }
    }
}
