//This code is written by MyT from No Name Studio VN. Do not attempt to copy and publish it with commercial purposes. Thank you very much!

const mf = require('mineflayer')
const c = require('mineflayer-cmd').plugin
const data = require("./config.json")
var lasttime = -1;
var moving = 0;
var connected = 0;
var a = ['forward', 'back', 'left', 'right']
var lastaction;
var pi = data.pi;
var moveinterval = data.moveinterval;
var maxrandom = data.maxrandom;
var h = data.ip;
var u = data.name;
var nightskip = data.autonightskip;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var f = mf.createBot({
  host: h,
  username: u
});
f.loadPlugin(c)

f.on('login',function(){
	console.log("Logged In")
	f.chat("Hi, I'm No Name Bot from No Name Studio VN. My mission here is to track survivors' activities, guide them and protect all the monument in the server.")
    f.chat("Hope you guys will have the best experience in this server! - From MyT with love!")
});

f.on('time', function(time) {
	if(nightskip == "true") {
        if(f.time.timeOfDay >= 13000) {
            f.chat('/time set day')
        }}
        if (connected <1) {
            return;
        }
        if (lasttime<0) {
            lasttime = f.time.age;
        } else {
            var randomadd = Math.random() * maxrandom * 20;
            var interval = moveinterval*20 + randomadd;
            if (f.time.age - lasttime > interval) {
                if (moving == 1) {
                    f.setControlState(lastaction,false);
                    moving = 0;
                    lasttime = f.time.age;
                } else {
                    var yaw = Math.random()*pi - (0.5*pi);
                    var pitch = Math.random()*pi - (0.5*pi);
                    f.look(yaw,pitch,false);
                    lastaction = a[Math.floor(Math.random() * a.length)];
                    f.setControlState(lastaction,true);
                    moving = 1;
                    lasttime = f.time.age;
                    f.activateItem();
            }
        }
    }
});

f.on('spawn',function() {
    connected=1;
});

f.on('death',function() {
    f.emit("respawn")
});

