const { RichEmbed } = require('discord.js');
const { categoryID } = require('../config.json')
const ticketmessage = new RichEmbed()
    .setTitle(`New Order`)
    .addField("Thank you for creating a new order!", "Please answer all the questions below so we can assist you.")
    .addField("Question 1:", "How much Cash are you looking to purchase? (Every $5 = $50million. Depending on how much you do, we add extra on the side)")
    .setColor('#df214b')
    .setFooter("Akiva Boosts | Order System")
    .setTimestamp()

module.exports = (bot, id, checker, room, server) => {
    server.createChannel(`order-` + checker, { type: 'text' }).then(async c => {
        username = await bot.fetchUser(id)
        let insta = bot.channels.get(room)
        const creation = new RichEmbed()
            .setTitle("Order Created")
            .setColor('#df214b')
            .setDescription(`Thank you for starting an order! You can view your order here: ${c}`)
        insta.send({ embed: creation }).then(m => m.delete(10000));
        let role1 = server.roles.find(role => role.name === "@everyone");
        let role2 = server.roles.find(role => role.id === "644664589551927356");
        c.setParent(categoryID)
        c.setTopic("Order For:" + username.username)
        c.overwritePermissions(role1, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(username, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        let filter = msg => msg.content.length > 0 && msg.author.id == username.id;
        c.send({ embed: ticketmessage }).then(msg => {
            c.awaitMessages(filter, {
                max: 1,
            }).then(async collected => {
                let categories = [];
                categories[0] = collected.first().content
                await collected.first().delete()
                msg.delete()
                let qembed = new RichEmbed()
                .setColor('#df214b')
                let questions = ['Are you wanting the additional features with your purchase (this is optional and free of charge)? (Unlock all and + 100 rankings to current rank)', 'Who referred you to Akiva Boosts?', 'Do you agree with our Terms of Service?']
                for (i = 0; i < 3; i++) {
                    boss = i + 2
                    qembed.setTitle(`Question ${boss}`)
                    qembed.setDescription(`${questions[i]}`)
                    // Instead of then, await and assign each return value
                    const cat = await c.send(qembed)
                    const collected = await c.awaitMessages(filter, { max: 1, })
                    await collected.first().delete()
                    const that = collected.first().content
                    categories.push(that)
                    await cat.delete()
                }
                let results = new RichEmbed()
                .setTitle(`Order Summarry`)
                .addField(`How much cash:`, `${categories[0]}`)
                .addField(`Additional Features:`, `${categories[1]}`)
                .addField(`Reffered by:`, `${categories[2]}`)
                .setColor('#df214b')
                .addField(`Agree with terms of service?`, `${categories[3]}`)
                c.send(results)
            });
        })
    })


}