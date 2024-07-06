const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purges chat')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to purge')
        .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
    const amount = interaction.options.getInteger('amount');
    if (amount <= 0 || amount > 100) {
      return await interaction.reply({ content: 'You must provide a number between 1 and 100.', ephemeral: true });
    }
    await interaction.channel.bulkDelete(amount)
      .catch(error => {
        console.error('Error purging messages:', error);
        return interaction.reply({ content: 'There was an error purging messages.', ephemeral: true });
      });
    const exampleEmbed = new EmbedBuilder()
      .setColor('#000000')
      .setDescription(`Purged ${amount} messages from ${interaction.channel.name}`)
      .addFields(
        { name: 'Purged By:', value: `${interaction.user.tag}`, },
        )
      .setTimestamp()
    await interaction.reply({embeds: [exampleEmbed]});
  },
};
