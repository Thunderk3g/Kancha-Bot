

function jay(message) {
    message.channel.send("Murtichor lai khojeko ho?");
    message.channel.send("Just Kidding Lah , He is ekdam handsome kto 😘😘");
    message.channel.send("PA Lord",{ files: [{ attachment: './images/pa_lord.jpg' }] });
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/sexy.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function prasiddha(message){
    message.channel.send("Prassidha , the hancy boy ,lai khojeko ho?");
    message.channel.send("He busy with girls you single fuck");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/minang.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function aavash(message){
    message.channel.send("Mog guithe ho tyo ek number ko!");
    message.channel.send("Katta haan teslai");
    message.channel.send("Olala",{ files: [{ attachment: './images/chowk_tira.jpg' }] }); 
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/chowk_tira.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function abhishek(message){
    message.channel.send("You mean the guy who says ,Diwakar Throw Nahana , Diwakar Throw Nahana");
    message.channel.send(" Or The Ultimate Enigma Player ?");
    message.channel.send("Kera Khau",{ files: [{ attachment: './images/enigma_lord.jpg' }] });
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/dhala.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function eerie(message){
    message.channel.send("The G.O.A.T Natures Prophet");
    message.channel.send("I see , I rat , I win",{ files: [{ attachment: './images/rat_lord.png' }] });
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/ratgod.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function shreejan(message){
    message.channel.send("I am good at Dota");
    message.channel.send(" Le Sky Players",{ files: [{ attachment: './images/sky_lord.jpg' }] }); 
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/comrade.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function aayush(message){
    message.channel.send("Jai Shambhoooooo");
    message.channel.send("Pro Majnus Player",{ files: [{ attachment: './images/tare_zameen_par.jpg' }] }); 
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/tare.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function dai(message){
    message.channel.send("He is the son of zeus");
    message.channel.send({ files: [{ attachment: './images/king_lord.jpg' }] }); 
    message.channel.send("Ayera Dhog Mog");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/milena.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}

function ananya(message){
    message.channel.send("Ohhh , that cutie");
    message.channel.send("She is so pretty <3");
    message.channel.send("Olala",{ files: [{ attachment: './images/pog_lord.jpg' }] }); 
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
    voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.play('./mp3/sexy.mp3');
        dispatcher.on("end", end => {voiceChannel.leave()});
    })
    .catch(console.error);
}
module.exports ={jay,prasiddha,aavash,abhishek,eerie,shreejan,aayush,dai,ananya};