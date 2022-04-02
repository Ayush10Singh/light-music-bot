const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "stop",
    description: "Stops playing and cleares the Queue",
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
        // no new songs (and no current)
        queue.tracks = [];
        // skip the track
        oldConnection.state.subscription.player.stop();
        
        return interaction.reply(`🛑 **Successfully stopped playing and cleared the Queue.**`).catch(() => null);
    },
};