const { closedID } = require('../../config.json')
module.exports = {
    config: {
        name: "close",
        description: "Closes an opened ticket.",
        usage: "-close",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["closeticket"]
    },
    run: async (bot, message, args) => {
        message.delete();
        if (message.channel.name.startsWith(`order-`)) {
            // Confirm delete - with timeout (Not command)
            message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`!yes\`. This will time out in 10 seconds and be cancelled.`)
                .then((m) => {
                    message.channel.awaitMessages(response => response.content === '!yes', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                        .then((collected) => {
                            let role1 = server.roles.find(role => role.name === "@everyone");
                            message.channel.bulkDelete(1);
                            message.channel.setParent(closedID);
                            message.channel.lockPermissions()
                            setTimeout(function () {
                                message.channel.overwritePermissions(role1, {
                                    SEND_MESSAGES: false,
                                    READ_MESSAGES: false
                                });
                            }, 500);
                            
                        })
                        .catch(() => {
                            m.edit('Order close timed out, the ticket was not closed.').then(m2 => {
                                m2.delete();
                                message.channel.bulkDelete(1);
                            }, 3000);
                        });
                });
        }
        else {
            return message.channel.send(`You can't use the close command outside of a order channel.`);
        }
    }
}
