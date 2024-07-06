const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for kicking')
        .setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has('KickMembers')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
    
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!user) {
      return await interaction.reply({ content: 'You must provide a user to kick.', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return await interaction.reply({ content: 'User not found in this server.', ephemeral: true });
    }

    if (!member.kickable) {
      return await interaction.reply({ content: 'I cannot kick this user.', ephemeral: true });
    }

    try {
      await member.kick({ reason });
      const exampleEmbed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle('User Kicked')
        .setDescription(`${user.username} has been kicked`)
        .addFields(
          { name: 'Reason:', value: reason, },
          { name: 'Kicked By:', value: `${interaction.user.tag}`}
        )
        .setTimestamp()
      await interaction.reply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.error('Error kicking user:', error);
      await interaction.reply({ content: 'There was an error kicking the user.', ephemeral: true });
    }
  },
};
