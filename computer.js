const exec = require('child_process').exec;
const helpers = require('./helpers');
const keypress  = require('keypress');

var player = require('play-sound')(opts = {});
var audio = null;

helpers.addHelpers();

const keyEvents = {};
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', function (ch, key) {
    if (keyEvents[key.name]) {
        keyEvents[key.name]();
    }

    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
    }
});

class Computer {
    when (e, callback) {
        const event = e.split(' ');
        const type = event.shift();

        if (type === 'key') {
            event.forEach(key => {
                keyEvents[key] = callback;
            });
        }
    }
}

const computer = { 
    addComputer () {
        return new Computer();
    },
    takePhoto () {
        const fileName = Date.now();
        exec(`ffmpeg -f avfoundation -video_size 640x480 -framerate 30 -i "0" -vframes 1 ${fileName}.jpg`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
            } else {
                exec(`open -a Preview ${fileName}.jpg`);
            }
        });
    },
    takePIPhoto () {
        const fileName = Date.now();
        exec(`raspistill -vf -hf -o ./images/${filename} -w 1920 -h 1440 -t 1000`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
            } else {
                exec(`open -a Preview ${fileName}.jpg`);
            }
        });
    },
    recordVideo (length) {
        const fileName = Date.now();
        exec(`ffmpeg -f avfoundation -video_size 640x480 -framerate 30 -t ${length} -i "0:2" ${fileName}.mkv`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
            } else {
                exec(`open -a VLC ${fileName}.mkv`);
            }
        });
    },
    playSound (file) {
        audio = player.play(file);
    },
    stopSound () {
        audio.kill();
    }
};

module.exports = computer;