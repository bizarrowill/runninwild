require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);



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

// client.on('message', async (channel, context, message) => {
//   const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

//   if ( !isNotBot ) return;

//   const [raw, command, argument] = message.match(regexpCommand);

//   const { response } = commands[command] || {};

//   let responseMessage = response;

//   if ( typeof responseMessage === 'function' ) {
//     responseMessage = response(argument);
//   }

//   if ( responseMessage ) {
//     console.log(`Responding to command !${command}`);
//     client.say(channel, responseMessage);
//   }

// });

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	// const command = args.shift().toLowerCase();
  const commands = {
    links: {
      response: 'Follow me on Twitter https://twitter.com/UlrichTyson and Instagram https://www.instagram.com/t_bone1701/'
    },
    RW: {
      response: (argument) => `that's right ${argument} its time to RUN WILD!`
    },
    break: {
      response: 'test break messsage'
    }
  }
  

	// if(command === 'echo') {
	// 	client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	// }

  const [raw, command, argument] = message.match(regexpCommand);

  const { response } = commands[command] || {};

  let responseMessage = response;

  if ( typeof responseMessage === 'function' ) {
    responseMessage = response(argument);
  }

  if ( responseMessage ) {
    console.log(`Responding to command !${command}`);
    client.say(channel, responseMessage);
  }
});