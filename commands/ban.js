const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for banning')
        .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has('BanMembers')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
    
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!user) {
      return await interaction.reply({ content: 'You must provide a user to ban.', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return await interaction.reply({ content: 'User not found in this server.', ephemeral: true });
    }

    if (!member.bannable) {
      return await interaction.reply({ content: 'I cannot ban this user.', ephemeral: true });
    }

    try {
      await member.ban({ reason });
      const exampleEmbed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('User Banned')
        .setDescription(`${user.username} is now banned`)
        .addFields(
          { name: 'Reason:', value: reason, },
          { name: 'Banned By:', value: `${interaction.user.tag}`}
        )
        .setTimestamp()
      await interaction.reply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.error('Error banning user:', error);
      await interaction.reply({ content: 'There was an error banning the user.', ephemeral: true });
    }
  },
};
