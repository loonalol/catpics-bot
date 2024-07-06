import { Client, Events, GatewayIntentBits, ActivityType } from 'discord.js';
import { registerCommands, handleInteraction } from './cmdhandle';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

export default function bot() {
  client.once(Events.ClientReady, async (c) => {
    console.log(`My name is ${c.user.username} and I'm watching ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members`);
    c.user.setPresence({
      activities: [{
        name: 'with ur mom',
        type: ActivityType.Playing,
      }],
      status: 'dnd'
    });
    console.log(`My status is "${c.user.presence.activities}" and my status is "${c.user.presence.status}"`);
    await registerCommands(c.user.id);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isCommand()) {
      await handleInteraction(client, interaction);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
}
