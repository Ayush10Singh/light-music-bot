const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "trackloop",
    description: "Toggles the Track-Loop",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply("👎 **Please join a Voice-Channel first!**").catch(() => null);
        // get an old connection
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply("👎 **I'm not connected somewhere!**").catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply("👎 **We are not in the same Voice-Channel**!").catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id); // get the queue
        if(!queue) { 
            return interaction.reply(`👎 **Nothing playing right now**`).catch(() => null);
        }
        if(queue.queueloop) queue.queueloop = false

        // no new songs (and no current)
        queue.trackloop = !queue.trackloop
        // skip the track
        
        return interaction.reply(`🔁 **Track-Loop is now \`${queue.trackloop ? "Enabled" : "Disabled"}\`**`).catch(() => null);
    },
};