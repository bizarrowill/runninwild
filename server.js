require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	channels: [ 'itsribeye' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  // const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME

  // if (isNotBot) {
  //   client.say(channel, `Message "${message}" was sent by ${tags.username}`);
  // }
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});