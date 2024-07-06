const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Replies with Rules'),
  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
    const exampleEmbed = new EmbedBuilder()
    .setColor('#000000')
	.setTitle('catpics.xyz rules')
	.setDescription('Last Updated: [Sat Jul 6, 2024 @ 18:04]')
	.addFields(
        { name: ' ', value: '**1** Be respectful and kind to others.' },
        { name: ' ', value: '**2** No spamming.' },
        { name: ' ', value: '**3** No NSFW or explicit content.' },
        { name: ' ', value: '**4** No unauthorized advertising.' },
        { name: ' ', value: '**5** Respect privacy and don\'t share personal info.' },
        { name: ' ', value: '**6** Follow Discord\'s TOS' },
        { name: ' ', value: '**7** Use appropriate language (racial slurs are strictly prohibited)' },
        { name: ' ', value: '**8** English only' },
        { name: ' ', value: '**9** Pictures and content deemed inappropriate are strictly prohibited.' },
        { name: ' ', value: '**10** Any sort of sexual harassment/reference, whether it is a joke or not is either a warning or an instant ban.' },
        { name: ' ', value: '**11** No impersonation or deception. (especially impersonating a staff)' }
    )    
	.setTimestamp()
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
