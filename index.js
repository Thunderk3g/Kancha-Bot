
const ytdl = require("ytdl-core");
const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
var search = require("youtube-search");
const Wordle = require("./utils/wordle.js");
const Music = require("./utils/music.js");
const Friends = require("./utils/friends.message.js");
//Uncomment the next line to run locally and add a .env file with preffered PREFIX , discord.js token as DJS_TOKEN and Youtube Data API token as YTS_TOKEN
// require('dotenv').config();
const queue = Music.queue;

client.once("ready", () => {
  console.log("Connected to the Discord Channel!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});
var opts = {
  maxResults: 3,
  key: process.env.YTS_TOKEN,
};
var index = Number;
//Music Bot Listens to the command//

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  permision = message.channel.permissionsFor(client.user);
  permision = permision.toArray();
  if(message.author.username === client.user.username) {return;}

  const serverQueue = queue.get(message.guild.id);

  //Checks for Prefix and Executes the relevant command
  if (message.content.startsWith(`${process.env.PREFIX}play`)) {
    Music.execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${process.env.PREFIX}skip`)) {
    Music.skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${process.env.PREFIX}stop`)) {
    Music.stop(message, serverQueue);
    return;
  }
    //For Wordle
  else if (message.content.startsWith(`${process.env.PREFIX}wordle`)) {
      Wordle.LoadNewWordle(message);
      return;
  } else if (message.content.startsWith(`${process.env.PREFIX}guess`)) {
      Wordle.PlayWordle(message);   
       return;
  } else if (message.content.startsWith(`${process.env.PREFIX}wordlestats`)) {
      Wordle.ShowWordleStats(message);
      return;
  } 

  //Funny Text 
  else if (message.content.startsWith(`${process.env.PREFIX}jay`)) {
    Friends.jay(message);
    return
  }
   else if (message.content.startsWith(`${process.env.PREFIX}prasiddha`)) {
    Friends.prasiddha(message);
    return
  } 
  else if (message.content.startsWith(`${process.env.PREFIX}aavash`)) {
    Friends.aavash(message);
    return

  }
  else if (message.content.startsWith(`${process.env.PREFIX}abhishek`)) {
    Friends.abhishek(message);
    return
  }
  else if (message.content.startsWith(`${process.env.PREFIX}eerie`)) {
    Friends.eerie(message);
    return
  }
  else if (message.content.startsWith(`${process.env.PREFIX}shreejan`)) {
   Friends.shreejan(message);
   return
   }
   else if (message.content.startsWith(`${process.env.PREFIX}aayush`)) {
    Friends.aayush(message);
    return
   }
  else if (message.content.startsWith(`${process.env.PREFIX}diwakar`)) {
    message.channel.send("!dai bhan mog");
  }
  else if (message.content.startsWith(`${process.env.PREFIX}dai`)) {
    Friends.dai(message);
    return
  }
  else if (message.content.startsWith(`${process.env.PREFIX}ananya`)) {
    Friends.ananya(message);
    return
  }
  else {
    message.channel.send("You need to enter a valid command!");
  }
});



client.login(process.env.DJS_TOKEN);
