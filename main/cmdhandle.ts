import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, CommandInteraction } from 'discord.js';
import fs from 'fs';
import path from 'path';

interface Command {
  data: {
    name: string;
    description: string;
    options?: object[];
  };
  execute: (interaction: CommandInteraction) => Promise<void>;
}

const commands: Command[] = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

console.log('Loading command files:');
for (const file of commandFiles) {
  console.log(`Loading command: ${file}`);
  const command: Command = require(`../commands/${file}`);
  commands.push(command);
}

console.log('Commands to register:', JSON.stringify(commands, null, 2));

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('DISCORD_TOKEN environment variable is not set.');
}

const rest = new REST({ version: '9' }).setToken(token);

export async function registerCommands(clientId: string) {
  try {
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands.map(cmd => cmd.data) },
    );
    console.log('Successfully registered application commands globally.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

export async function handleInteraction(client: Client, interaction: CommandInteraction) {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  const command = commands.find(cmd => cmd.data.name === commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}
