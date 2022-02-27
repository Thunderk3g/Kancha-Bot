var search = require("youtube-search");
const { Client, Intents} = require('discord.js');
const ytdl = require("ytdl-core");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//Uncomment the next line to run locally
// require('dotenv').config();
const queue = new Map();

var opts = {
    maxResults: 3,
    key: process.env.YTS_TOKEN,
  };
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

  async function play (guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = await serverQueue.connection
      .play(ytdl(song.url,{ highWaterMark: 1<<25 ,quality: 'highestaudio' }))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
  module.exports = { execute,play, skip, stop,queue};
