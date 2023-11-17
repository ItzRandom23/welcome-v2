# welcome-card-discord

welcome-card-discord is a Node.js module for creating customized welcome images for Discord servers. It allows you to generate beautiful welcome images with user avatars, usernames, and a custom message.

## Installation

You can install welcome-card-discord via npm:

```bash
npm install welcome-card-discord
```

## Usage

Here's an example of how to use welcome-card-discord in your Discord bot:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { Welcome } = require('welcome-card-discord'); 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// Remove "//" if you need multiple backgrounds 
// const backgroundImages = [
//    'your png background link here',
//    'your png background link here',
//    'your png background link here',
//    'your png background link here',
//  ];
// let currentBackgroundIndex = 0; 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  const channelId = '1157243263728762900'; // Replace with the desired channel ID
  const channel = await client.channels.fetch(channelId); // Fetch the channel by ID
  if (channel) {
   
    const welcomeCard = new Welcome()
      .setName(member.user.username) // To change the color of the text, use this .setName(member.user.username , '#FFFFFF')  You can replace with your own hex code 
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
      .setTitle('Welcome') // To change the color of the text, use this .setTitle('Welcome`, '#FFFFFF') You can replace with your own hex code 
      .setMessage(`You are our ${member.guild.memberCount} Member`)  // To change the color of the text, use this .setMessage(`You are our ${member.guild.memberCount} Member`, '#FFFFFF') You can replace with your own hex code 
   // Remove "//" if you have added background 
   //   .setBackground(backgroundImages[currentBackgroundIndex]); 
    
    const welcomeImageBuffer = await welcomeCard.build();

    
    channel.send({ files: [welcomeImageBuffer] });

// Remove "//" if you have multiple backgrounds and want a different background every time 
//    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
  }
});

client.login("Bot_Token_Here")
```

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
![preview](https://s6.imgcdn.dev/99feL.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This module is based on napi-rs/canvas for canvas rendering.

## Contact

If you have any questions or suggestions, feel free to [contact us](https://discord.gg/cool-music-support-925619107460698202).
