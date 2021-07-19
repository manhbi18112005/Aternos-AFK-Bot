//This code is written by MyT from No Name Studio VN. Do not attempt to copy and publish it with commercial purposes. Thank you very much!

const mineflayer = require('mineflayer')
//const c = require('mineflayer-cmd').plugin
const data = require("./config.json")
var lasttime = -1;
var moving = 0;
var connected = 0;
var a = ['forward', 'back', 'left', 'right']
var lastaction;
var pi = data.pi;
var moveinterval = data.moveinterval;
var maxrandom = data.maxrandom;
var nightskip = data.autonightskip;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var bot = mineflayer.createBot({
  host: data.ip,
  username: data.username,
  port: data.port,
  version: "1.17.1"
  
});

//bot.loadPlugin(c)

bot.on('login', function() {
	console.log("Logged In")
	bot.chat("Hi, I'm No Name Bot from No Name Studio VN. My mission here is to track survivors' activities, guide them and protect all the monument in the server.")
    bot.chat("Hope you guys will have the best experience in this server! - From MyT with love!")
});

bot.on('time', function(time) {
	if(nightskip == "true") {
        if(bot.time.timeOfDay >= 13000) {
            bot.chat('/time set day')
        }}
        if (connected <1) {
            return;
        }
        if (lasttime<0) {
            lasttime = bot.time.age;
        } else {
            var randomadd = Math.random() * maxrandom * 20;
            var interval = moveinterval*20 + randomadd;
            if (bot.time.age - lasttime > interval) {
                if (moving == 1) {
                    bot.setControlState(lastaction,false);
                    moving = 0;
                    lasttime = bot.time.age;
                } else {
                    var yaw = Math.random()*pi - (0.5*pi);
                    var pitch = Math.random()*pi - (0.5*pi);
                    bot.look(yaw,pitch,false);
                    lastaction = a[Math.floor(Math.random() * a.length)];
                    bot.setControlState(lastaction,true);
                    moving = 1;
                    lasttime = bot.time.age;
                    bot.activateItem();
            }
        }
    }
});

bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)