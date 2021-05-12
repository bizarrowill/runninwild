require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
const reputationRegex = /(\+\+|--)/g;

// placeholder: 🎃🎄🎅🏻 🎸 🇺🇸🌎🏈⚾️💦⏱💀💯✅☠️👍🏻

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


client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;
  let quotes = [
    '“Relax! I’d Rather Not Piss This Thing Off!” -Master Chief',
    '“Men, keep your eyes downrange, fingers on the triggers, and we all come home in one piece. Am I right, Marines?” -Sgt. Major Avery Johnson',
    '“And you told me you were gonna wear something nice.” -Sgt. Major Avery Johnson',
    '“Asking’s Not My Strong Suit.” -Master Chief',
    '“Thought I’d Try Shooting My Way Out—Mix Things Up A Little.” -Master Chief',
    '“Usually the good Lord works in mysterious ways. But not today! This here is sixty-six tons of straight-up, H-E-spewing dee-vine intervention! If God is love, then you can call me Cupid!” -Sgt. Major Avery Johnson',
    '"RUN WILD" -T-Bone 🥩',
    '"Oh? Not everyone carries a box of Mac-n-cheese in their breifcase?" -Bizarro',
    '“Trust me, I can stick it.” -Master Chief',
    '"My bad sorry teammate" -probably Bizarro',
    '"Hold onto your butts" -Samuel L Jackson https://www.youtube.com/watch?v=JjuROyn6d28',
    '“What the hell are you doing?” -Cortana',
    '"I am issuing General Order 13" -Captain George Kirk, Sr'
  ]

	const args = message.slice(1).split(' ');
  const num = rollDice();
  const bone = getBoned();
  const up = pushUp();
  const quote = getRandomQuote(quotes)
	// const command = args.shift().toLowerCase();
  const commands = {
    links: {
      response: 'Join the Discord right here https://discord.gg/CuBB9Ahg 🌎 also follow me on Twitter https://twitter.com/UlrichTyson & Instagram https://www.instagram.com/t_bone1701/ 👍🏻'
    },
    RW: {
      response: (argument) => `🥩  @${tags.username} says its time to RUN WILD! 🥩 `
    },
    chill: {
      response: '⏱ Take 5, will return to normal programming shortly. Please drink water 💦 and always RUN WILD!'
    },
    echo: {
      response: (channel) => `${channel} @${tags.username}, you said: "${args.join(' ')}"`
    }, 
    dice: {
      response: () =>  `@${tags.username} rolled a 🎲🎲 ${num} & ${num}`
    },
    halo: {
      response: `${quote}`
    },
    mmm: {
      response: `🍕 @${tags.username} says deliver me some Gallucci's 🍕`
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
      response: `My xbox just 💀 because it hates Halo 3, will be back soon. “Dear Humanity… We regret being alien bastards. We regret coming to Earth. And we most definitely regret that the Corps just blew up our raggedy-*** fleet!” Sgt. Major Avery Johnson`
    }, 
    xmas: {
      response: `🎄🎅🏻 Xmas Eve Mobbin coming in xxx days, get your warthogs ready!`
    },
    pushup: {
      response: `💪🏻 @${tags.username} requests ${up} push-ups 💪🏻`
    },
    ribeye: {
      response: `Hi, I'm Ribeye 🥩. Here's a few things I can do: !pushup - request @t_bone1701 to do random amount of pushups 💪🏻, !boned - just try it out next time you see someone get boned, !halo - a random quote, !dice - roll 🎲🎲...why not?, !RW - let the world know what time it is! 🥩`
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

function getRandomQuote(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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