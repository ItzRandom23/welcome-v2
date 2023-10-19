# Welcome-Canvas

Welcome-Canvas is a Node.js module for creating customized welcome images for Discord servers using the Discord.js library. It allows you to generate beautiful welcome images with user avatars, usernames, and a custom message.

## Installation

You can install Welcome-Canvas via npm:

```bash
npm install welcome-canvas
```

## Usage

Here's an example of how to use Welcome-Canvas in your Discord bot:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { welcome } = require('welcome-canvas'); // Make sure the path to your 'welcome.js' file is correct

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    // Add other intents you need here
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  // Create an instance of the Welcome class with your custom options
  const welcomeCard = new welcome()
  .setName(member.user.username)
  .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
  .setTitle('Welcome')
  .setMessage(`You are our ${member.guild.memberCount} Member`)

  // Call the build method to create the welcome image
  const welcomeImageBuffer = await welcomeCard.build();

  // Send the welcome image as a message attachment
  member.guild.systemChannel.send({ files: [welcomeImageBuffer] });
});


client.login('YOUR_BOT_TOKEN');
```

## API

### new welcome(options)
- `options` (Object) - An object with the following optional properties:
  - `username` (String) - The username to display on the welcome card.
  - `avatar` (String) - The URL of the user's avatar.
  - `title` (String) - The title text on the welcome card.
  - `message` (String) - The message to display on the welcome card.

### setName(name)
- Set the username for the welcome card.

### setAvatar(image)
- Set the avatar image for the welcome card.

### setTitle(title)
- Set the title text for the welcome card.

### setColor(color)
- Set the color for text and graphics on the welcome card.

### setMessage(message)
- Set the message to display on the welcome card.

### build()
- Generate the welcome card image and return it as a buffer.

## Preview
https://media.discordapp.net/attachments/1118398421406068796/1164514927826960455/file.png

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This module is based on napi-rs/canvas for canvas rendering.

## Contact

If you have any questions or suggestions, feel free to [contact us](https://discord.gg/cool-music-support-925619107460698202).
