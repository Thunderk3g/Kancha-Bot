
const ytdl = require("ytdl-core");
const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
var search = require("youtube-search");
const Wordle = require("./wordle.js");

//Uncomment the next line to run locally and add a .env file with preffered PREFIX , discord.js token as DJS_TOKEN and Youtube Data API token as YTS_TOKEN
// require('dotenv').config();
const queue = new Map();

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
     execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${process.env.PREFIX}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${process.env.PREFIX}stop`)) {
    stop(message, serverQueue);
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
  else if (message.content.startsWith(`${process.env.PREFIX}murtichor`)) {
    message.channel.send("Jay Shakya lai khojeko ho?");
    message.channel.send("Just Kidding Lah , He is ekdam handsome kto 😘😘");
    message.channel.send("PA Lord",{ files: [{ attachment: './images/pa_lord.jpg' }] });
  } else if (message.content.startsWith(`${process.env.PREFIX}haddi`)) {
    message.channel.send("Prassidha lai khojeko ho?");
    message.channel.send("He busy with girls you single fuck");
  } 
  else if (message.content.startsWith(`${process.env.PREFIX}aavash`)) {
    message.channel.send("Mog guithe ho tyo ek number ko!");
    message.channel.send("Katta haan teslai");
  }
  else if (message.content.startsWith(`${process.env.PREFIX}abhishek`)) {
    message.channel.send("You mean the guy who says ,Diwakar Throw Nahana , Diwakar Throw Nahana");
    message.channel.send("Or the guy who says picks engima and gives blackhole to rubick");
    message.channel.send("Kera Khau",{ files: [{ attachment: './images/enigma_lord.jpg' }] });
  }
  else if (message.content.startsWith(`${process.env.PREFIX}eerie`)) {
    message.channel.send("The G.O.A.T Natures Prophet");
    message.channel.send("I see , I rat , I win",{ files: [{ attachment: './images/rat_lord.png' }] });
  }
  else if (message.content.startsWith(`${process.env.PREFIX}shreejan`)) {
    message.channel.send("I am good at Dota");
    message.channel.send(" Le Sky Players",{ files: [{ attachment: './images/sky_lord.jpg' }] }); 
   }
   else if (message.content.startsWith(`${process.env.PREFIX}aayush`)) {
    message.channel.send("Jai Shambhoooooo");
    message.channel.send("Pro Majnus Player",{ files: [{ attachment: './images/tare_zameen_par.jpg' }] }); 
   }
  else if (message.content.startsWith(`${process.env.PREFIX}diwakar`)) {
    message.channel.send("!dai bhan mog");
  }
  else if (message.content.startsWith(`${process.env.PREFIX}diwakardai`)) {
    message.channel.send("He is the son of zeus");
    message.channel.send({ files: [{ attachment: './images/king_lord.jpg' }] }); 
    message.channel.send("Ayera Dhog Mog");
  }
  else if (message.content.startsWith(`${process.env.PREFIX}ananya`)) {
    message.channel.send("Ohhh , that cutie");
    message.channel.send("Olala",{ files: [{ attachment: './images/pog_lord.jpg' }] }); 

  }
  else {
    message.channel.send("You need to enter a valid command!");
  }
});

function execute(message, serverQueue) {
  var args = message.content
    .split(" ")
    .toString()
    .replace("!play,", "")
    .replace(/,/g, " ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  search(args, opts, async function (err, results) {
    if (err) return console.log(err);
        var id = results[0].link;
        const songInfo = await ytdl.getInfo(id);
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
        };
        if (!serverQueue) {
          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
          };

          queue.set(message.guild.id, queueContruct);

          queueContruct.songs.push(song);

          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        } else {
          serverQueue.songs.push(song);
          return message.channel.send(
            `${song.title} has been added to the queue!`
          );
        }
  });
}
function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(process.env.DJS_TOKEN);
