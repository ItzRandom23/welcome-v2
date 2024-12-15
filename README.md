# welcome-v2

welcome-v2 is a Node.js module for creating customized welcome images for Discord servers. It allows you to generate beautiful welcome images with user avatars, usernames, and a custom message.

## Installation

You can install welcome-v2 via npm:

```bash
npm install welcome-v2
```

## Usage

### JavaScript Usage

Here's an example of how to use welcome-v2 in your Discord bot:

```javascript
// Import necessary modules
const { Client, GatewayIntentBits } = require('discord.js'); // For Discord bot functionality
const { Welcome } = require('welcome-v2'); // Import the welcome card module

// Initialize the Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Optional: Define an array of backgrounds if you want to rotate backgrounds
// const backgroundImages = [
//   'your-background-url-1',
//   'your-background-url-2',
//   'your-background-url-3',
// ];

// Optional: Index to cycle through backgrounds
// let currentBackgroundIndex = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event listener for when a new member joins the server
client.on('guildMemberAdd', async (member) => {
  const channelId = '1157243263728762900'; // Channel ID where the welcome message should be sent
  const channel = await client.channels.fetch(channelId); // Fetch the channel

  if (channel) {
    // Create a new welcome card instance with customization
    const welcomeCard = new Welcome()
      .setName(member.user.username)  // Set the member's username (can also customize color with .setName(member.user.username, '#HEXCODE'))
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))  // Set the user's avatar as the image
      .setTitle('Welcome')  // Title text, can be customized
      .setMessage(`You are our ${member.guild.memberCount}th member!`)  // Customize the welcome message

    // Optional: Set background image if you have multiple backgrounds to choose from
    // .setBackground(backgroundImages[currentBackgroundIndex]);

    // Generate the welcome image buffer
    const welcomeImageBuffer = await welcomeCard.build();

    // Send the generated image to the specified channel
    channel.send({ files: [welcomeImageBuffer] });

    // Optional: Rotate background image if multiple backgrounds are used
    // currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
  }
});

// Log in to Discord using your bot token
client.login("YOUR_BOT_TOKEN");
```

### TypeScript Usage

For TypeScript users, the syntax would remain almost identical, but with type annotations to ensure better type checking:

```typescript
import { Client, GatewayIntentBits } from 'discord.js';
import { Welcome } from 'welcome-v2';  // Import the welcome card module

// Initialize the Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Define an optional array for rotating backgrounds
// const backgroundImages: string[] = [
//   'your-background-url-1',
//   'your-background-url-2',
// ];

// Index to cycle through backgrounds
// let currentBackgroundIndex: number = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  const channelId = '1157243263728762900'; // Replace with your channel ID
  const channel = await client.channels.fetch(channelId);

  if (channel) {
    // Create a new welcome card with the member's details
    const welcomeCard = new Welcome()
      .setName(member.user.username)
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
      .setTitle('Welcome')
      .setMessage(`You are our ${member.guild.memberCount}th member!`);

    // Optional: Add a rotating background
    // .setBackground(backgroundImages[currentBackgroundIndex]);

    // Generate the welcome card image
    const welcomeImageBuffer = await welcomeCard.build();

    // Send the welcome image to the channel
    channel.send({ files: [welcomeImageBuffer] });

    // Optional: Cycle through backgrounds if you have multiple options
    // currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
  }
});

// Log in with the bot token
client.login("YOUR_BOT_TOKEN");
```

### Key Highlights for TypeScript:
- **Type Safety**: TypeScript adds type annotations (like `string[]` for background images) to ensure better development experience and error prevention.
- **Compatibility**: The TypeScript example uses the same methods, so no major changes are needed between the JavaScript and TypeScript versions.

## API

### new Welcome(options)
- `options` (Object) - An object with the following optional properties:
  - `username` (String) - The username to display on the welcome card.
  - `avatar` (String) - The URL of the user's avatar.
  - `title` (String) - The title text on the welcome card.
  - `message` (String) - The message to display on the welcome card.
  - `background` (String) - The background to display on the welcome card.
  - `usernameColor` (String) - (Optional) The color for the username text (default is #FFD700).
  - `titleColor` (String) - (Optional) The color for the title text (default is #00BFFF).
  - `messageColor` (String) - (Optional) The color for the message text (default is #FFFFFF).

### setName(name, usernameColor)
- Set the username for the welcome card. Optionally, you can specify the color for the username text.

### setAvatar(image)
- Set the avatar image for the welcome card.

### setTitle(title, titleColor)
- Set the title text for the welcome card. Optionally, you can specify the color for the title text.

### setMessage(message, messageColor)
- Set the message to display on the welcome card. Optionally, you can specify the color for the message text.

### setBackground(background)
- Set the background to display on the welcome card.

## Preview
![preview](https://s6.imgcdn.dev/8VyEC.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This module is based on napi-rs/canvas for canvas rendering.

## Contact

If you have any questions or suggestions, feel free to [contact us](https://discord.gg/ZmyjpJ5RFq).
