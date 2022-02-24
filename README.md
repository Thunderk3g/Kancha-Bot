# Kancha-Bot

Nepali Discord Bot made in Node.Js deployed in Heroku

Entry Point -> index.js


## Dependencies
* ytdl-core

* youtube-search

# Installation and Use
Clone the Respository
```sh
git clone https://github.com/Thunderk3g/Kancha-Bot/
```
## Setting Enviroment Variables 
```sh
npm install dotenv
```
create a .env file with : PREFIX , DJS_TOKEN (DiscordJS Token) & YTS_TOKEN(Youtube Data API token)
```SH
cd kancha-bot
npm install
nodemon start
```
## Current Commands

|Command|Description|
|:-:|:-:|
|`!play [song-name]`| Plays music from Youtube described by song-name.|
|`!stop `|Stops the music and disconnects the bot|
|`!skip`| Skips the current song and goes to the next song|
|`!wordle`|Starts a game of wordle|
|`!guess [word]`|Guess the word for the wordle|
|`!wordlestats`|Shows the stats for the user|
