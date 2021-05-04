require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

// placeholder: 🎃🎄🎅🏻 🎸 🇺🇸🌎🏈⚾️

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
	channels: [ 't_bone1701' ]
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
  const num = rollDice();
  const bone = getBoned();
  const up = pushUp();
	// const command = args.shift().toLowerCase();
  const commands = {
    links: {
      response: 'Follow me on Twitter https://twitter.com/UlrichTyson and Instagram https://www.instagram.com/t_bone1701/'
    },
    RW: {
      response: (argument) => `🥩  @${tags.username} says its time to RUN WILD! 🥩 `
    },
    chill: {
      response: 'Take 5, will return to normal programming shortly. Please drink water and always RUN WILD!'
    },
    echo: {
      response: (channel) => `${channel} @${tags.username}, you said: "${args.join(' ')}"`
    }, 
    dice: {
      response: () =>  `@${tags.username} you rolled a 🎲🎲 ${num} and ${num}`
    },
    halo: {
      response: '“Relax! I’d Rather Not Piss This Thing Off!” -Master Chief'
    },
    mmm: {
      response: `deliver me some Gallucci's 🍕`
    }, 
    rock: {
      response: `Throw your 🤘🏻 in the chat if you want to see Nature's Majesty climb the charts in Rockband`
    },
    boned: {
      response: `#boned 🥩 ${bone}%`
    },
    request: {
      response: `🎸 If the song you want to hear isn't available head here and let @harmonix know 🤘🏻 https://www.harmonixmusic.com/games/rock-band/request`
    },
    h3: {
      response: `My xbox is just died because it hates Halo 3, will be back soon. “Dear Humanity… We regret being alien bastards. We regret coming to Earth. And we most definitely regret that the Corps just blew up our raggedy-*** fleet!” Sgt. Major Avery Johnson`
    }, 
    xmas: {
      response: `🎄🎅🏻 Xmas Eve Mobbin coming in xxx days, get your warthogs ready!`
    },
    pushup: {
      response: `💪🏻 @${tags.username} requests ${up} push-ups 💪🏻`
    }
  }
  

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

function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function getBoned () {
  const sides = 100;
  return Math.floor(Math.random() * sides) + 1;
}

function pushUp () {
  const sides = 50;
  return Math.floor(Math.random() * sides) + 1;
}