const Discord = require("discord.js");
module.exports = {
    config: {
        name: "ordersystem",
        description: "Creates a new ticket reaction collection.",
        usage: "ordersystem",
        category: "moderation",
        accessableby: "Admins",
    },
    run: async (bot, message, args) => {
        server = message.guild
        room = message.channel.id
        message.delete();
        let checker = message.author.username.toLowerCase();
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!").then(m => m.delete(10000));
        const reactembed = new Discord.RichEmbed()
            .setDescription(`React to create your Order.`)
            .setColor('#df214b')
        message.channel.send(reactembed)
            .then(async function (msg) {

                await msg.react('📃')

                bot.on('messageReactionAdd', (messageReaction, user) => {
                    const { message, emoji } = messageReaction; 
                    if(emoji.name === "📃") { 
                    if(message.id === msg.id){
                        let username;
                        let checker;
                        messageReaction.users.forEach((item) => {
                            if (item.id == 646921306234683413) return;
                            username = item.id;
                            let checker = item.username.toLowerCase();
                            ["ticketcreate"].forEach(x => require(`../../handlers/${x}`)(bot, username, checker, room, server));
                            msg.reactions.forEach(reaction => reaction.remove(username))

                        })
                    }
                }
                })

            });
        }
    }
