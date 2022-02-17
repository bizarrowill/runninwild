require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
// const reputationRegex = /(\+\+|--)/g;

// placeholder: 🎃🎄🎅🏻 🎸 🇺🇸🌎🏈⚾️💦⏱💀💯✅☠️👍🏻

const tmi = require('tmi.js');
const reputation ={};

const Chuck  = require('chucknorris-io'),
      newChuck = new Chuck();

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
	  //reputation system
    const reputationRegex = /(\+\+|--)/g;

    if(reputationRegex.test(message)) {
      const [user, operator] = message.split(reputationRegex);
  
      if(!(user in reputation)) {
        reputation[user] = 0;
      }
  
      if(operator === '++') {
        reputation[user]++;
      } else {
        reputation[user]--;
      }
  
      client.say(channel, `🥩 ${user} now has ${reputation[user]} riblets 🥩`);
      return;
    }
  
  if(self || !message.startsWith('!')) return;

  let haloquotes = [
    '“Relax! I’d Rather Not Piss This Thing Off!” -Master Chief',
    '“Men, keep your eyes downrange, fingers on the triggers, and we all come home in one piece. Am I right, Marines?” -Sgt. Major Avery Johnson',
    '“And you told me you were gonna wear something nice.” -Sgt. Major Avery Johnson',
    '“For a brick… he flew pretty good.” -Sgt. Major Avery Johnson',
    '“The Chief is gonna jump in this tank, roll across the bridge, and blow up any inhuman-son-of-***** dumb enough to get between him and the Prophet of Regret! Pull yourself together, because you’re going with him!” -Sgt. Major Avery Johnson',
    '“Stand back, Marines. Let the Chief show you how it’s done!” -Sgt. Major Avery Johnson',
    '“Asking’s Not My Strong Suit.” -Master Chief',
    '“Thought I’d Try Shooting My Way Out—Mix Things Up A Little.” -Master Chief',
    '“Usually the good Lord works in mysterious ways. But not today! This here is sixty-six tons of straight-up, H-E-spewing dee-vine intervention! If God is love, then you can call me Cupid!” -Sgt. Major Avery Johnson',
    '“Trust me, I can stick it.” -Master Chief',
    '"Sir, finishing this fight." -Master Chief',
    '"I figure if God can hear how scared I am, so can everyone else. Locke, you buying the first drink when we\'re done?" -Spartan Edward Buck, Halo 5',
    '"You\'ve completed your mission, Spartan Locke. Mine is just beginning." -Master Chief',
    '“Wake Me…When You Need Me.” -Master Chief',
    '"Our duty, as soldiers, is to protect humanity... whatever the cost." -Master Chief',
    '"To give the covenant back their bomb." -Master Chief',
    '"My bad sorry teammate" -probably Bizarro',
    '"No, sir. I\'ll be the decoy." -Lasky',
    '"What the hell are those things?" -Lasky',
    '"Axios!" -Lasky',
    '"I don\'t know if it\'s too soon to ask you for a favor, but...we\'re going to run out of breathing room here real quick. I don\'t suppose you\'re any good at clearing LZs?" -Lasky',
    '"Negative. I have the gun. Good luck, sir.” -Noble 6',
    '“What the hell are you doing?” -Cortana',
    '"Thanks, Chief. It was getting a bit dicey there for a minute." -Lasky',
    '"There are those who said this day would never come. What have they to say now?" -Prophet of Truth, Halo 2',
    '“Now would be a very good time to leave!” -Cortana',
    '“Security to the bridge, the Master Chief has gone rampant! Take him down, boys.”  -Cortana',
    '“Hmm… I’m detecting a high degree of cerebral cortex activity. You’re not the muscle-bound automatons the press makes you out to be.” =Cortana',
    '“You have a better idea?” =Master Chief',
    '"Roger that, Chief. You might want to back up a little. Main battery, fire!" -Lasky',
  ]
  let quotes = [
    '"RUN WILD" @T_Bone1701 🥩',
    '“May the Force be with you.” -Star Wars, 1977',
    '“There\'s no place like home.” -Dorothy, The Wizard of Oz, 1939',
    '“Logic is the beginning of wisdom, not the end.” —Spock 🖖🏻',
    '“Live long, and prosper 🖖🏻” —Spock',
    '“But one man can change the present!” —Captain Kirk',
    '“Things are only impossible until they’re not.” —Captain Kirk',
    '"Oh? Not everyone carries a box of Mac-n-cheese in their breifcase?" -Bizarro',
    '"My bad sorry teammate" -probably Bizarro',
    '"Hold onto your butts" -Samuel L Jackson https://www.youtube.com/watch?v=JjuROyn6d28',
    '"I am issuing General Order 13" -Captain George Kirk, Sr',
    '"Shut up Siri! I wasn\'t talking to you" -Bizarro', 
    '"The greatest discovery of all time is that a person can change his future by merely changing his attitude." -Oprah Winfrey', 
    '"Yippie-Ki-Yay, Mother%$#@#$" -John McClane', 
    '“What we\'ve got here is failure to communicate.” -Cool Hand Luke, 1967', 
    '“I\'ll be back.” -The Terminator, 1984', 
    '“Keep your friends close, but your enemies closer.” -The Godfather Part II, 1974', 
    '“That\'ll do, pig. That\'ll do.” -Farmer Hoggett, Babe 🐷, 1995', 
    '“That\'ll do, donkey. That\'ll donkey.” -Shrek, 2001', 
    '“You\'re gonna need a bigger boat.” -Chief Brady, Jaws, 1975', 
    '“It is possible to commit no mistakes and still lose. That is not weakness, that is life.” ―Jean-Luc Picard', 
    '“A man either lives life as it happens to him, meets it head-on and licks it, or he turns his back on it and starts to wither away.” ―Gene Roddenberry', 
    '"The greatest way to live with honor in this world is to be what we pretend to be." -Socrates', 
    '"Never was anything great achieved without danger." -Machiavelli', 
    '"I have asked Alexa to turn off my bedroom lights for four minutes now...Guess it would help if I was in my bedroom... Ok bye. LOL" @Doc_Chaos', 
  ]
  let meats = [
    'is foraging the meats 🍗🥩🍖 for the feast 🍽',
    'is checking the steaks 🥩 on the grill',
    'is off searching for the finest 🥩 & 🧀 in all the 🌎',
  ]

  let rips = [
    '💀',
    '☠️',
    '👻',
    '🪦',
    '🏴‍☠️',
    '😵',
  ]

  let ggs = [
    '🍗🥩🍖 GGs 🍗🥩🍖',
    '🍗🥩🍖 ggs 🍗🥩🍖',
    '🥩 ggs 🥩',
    '🥩 GGs 🥩',
  ]

	const args = message.slice(1).split(' ');
  const num = rollDice();
  const num2 = rollDice();
  const bone = getBoned();
  const up = pushUp();
  const quote = getRandomQuote(quotes);
  const haloquote = getRandomQuote(haloquotes);
  const meat = getRandomQuote(meats);
  const gg = getRandomQuote(ggs);
  const rip = getRandomQuote(rips);
  // const chuck = newChuck.getRandomJoke().then(function (response) {
  //   // do stuff here
  //       console.log(response.value);
  //       response = response.json();
  //       return response;
  // }).then(function (data) {
  //       // message.channel.send(response);
  //       console.log(data.value);
  //   });
	// const command = args.shift().toLowerCase();
  const commands = {
    links: {
      response: 'Join the Discord right here https://discord.gg/CuBB9Ahg 🌎 also follow me on Twitter https://twitter.com/t_bone1701 & Instagram https://www.instagram.com/t_bone1701/ 👍🏻'
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
      response: () =>  `@${tags.username} rolled a 🎲🎲 ${num} & ${num2}`
    },
    quote: {
      response: `${quote}`
    },
    halo: {
      response: `${haloquote}`
    },
    gg: {
      response: `${gg}`
    },
    rip: {
      response: `${rip}`
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
      response: `🎄🎅🏻 Xmas Eve Mobbin coming in ${Final_Result} days, get your warthogs ready!`
    },
    pushup: {
      response: `💪🏻 @${tags.username} requests ${up} push-ups 💪🏻`
    },
    ribeye: {
      response: `Hi ${tags.username}, I'm Ribeye 🥩. Here's a few things I can do: !boned - just try it, !halo !quote - random quotes, !dice - roll 🎲🎲...why not?, !RW - let the world know what time it is! !lurk !unlurk - you know, !riblets - earn that meat...redeem those rewards Other: !gg !rip !rules !links 🥩`
    },
    s2: {
      response: `🥩 Season 2 of Halo Infinite with campaign co-op comes out May 3! 🥩 `
    },
    lurk: {
      response: `🥩 @${tags.username} ${meat}`
    },
    chair: {
      response: `🥩 Wait for it... 😂👀🪑 https://www.youtube.com/watch?v=be60bsRDJDA&ab_channel=TBONE1701 😂🥩`
    },
    unlurk: {
      response: `🥩 @${tags.username} has returned with with a feast for all of Runnin Wild 🥩`
    },
    so: {
      response: `🥩 @${tags.username} says ${args[1]} is awesome and you should give them a follow at https://twitch.com/${args[1]} 🥩`
    },
    // rank: {
    //   response: `🥩 ${tags.username} has ${reputation[user]} riblets 🥩`
    // },
    giveaway: {
      response: `🥩 We'll be doing a giveaway to celebrate hitting affiliate soon! Follow @T_Bone1701 to be eligible and tell a friend! #50 #runninwild 🥩`
    },
    give: {
      response: `🥩 We'll be doing a giveaway to celebrate hitting affiliate soon! Follow @T_Bone1701 to be eligible and tell a friend! #50 #runninwild 🥩`
    },
    rules: {
      response: `🥩 Rules for the chat: Be kind ☺️. No politics, ists or isms 🥩 🚨 Disclaimer: Things may get a bit WILD🚨`
    },
    // chuck: {
    //   response: `${chuck}`
    // }
    riblets: {
      response: `🥩 Want to make T-Bone eat a bean? Redeem your Riblets for random shenanigans 🥩`
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





// async function fetchJoke() {
//   const jokeData = await fetch('https://icanhazdadjoke.com/', {
// 		headers: {
// 			Accept: 'application/json',
// 		},
// 	});
// 	const jokeObj = await jokeData.json();
  
// 	console.log(jokeObj.joke);
//   return jokeObj.joke;
// }

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

   // One day Time in ms (milliseconds)
   var one_day = 1000 * 60 * 60 * 24
  
   // To set present_dates to two variables
   var present_date = new Date();
     
   // 0-11 is Month in JavaScript
   var christmas_day = new Date(present_date.getFullYear(), 11, 25)
     
   // To Calculate next year's Christmas if passed already.
   if (present_date.getMonth() == 11 && present_date.getdate() > 25)
       christmas_day.setFullYear(christmas_day.getFullYear() + 1)
     
   // To Calculate the result in milliseconds and then converting into days
   var Result = Math.round(christmas_day.getTime() - present_date.getTime()) / (one_day);
     
   // To remove the decimals from the (Result) resulting days value
   var Final_Result = Result.toFixed(0);
     
   //To display the final_result value
  //  document.write("Number of days remaining till christmas <br>" 
  //                 + present_date + "<br> and <br>" 
  //                 + christmas_day + " is: <br> " 
  //                 + Final_Result);