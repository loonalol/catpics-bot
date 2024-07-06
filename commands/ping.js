const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor('#000000')
      .setTitle('Ping Command')
      .setDescription(`🏓 Latency is ${interaction.client.ws.ping}ms`)
      .setTimestamp()

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
