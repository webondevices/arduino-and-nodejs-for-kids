var exec = require('child_process').exec;
var helpers = require('./helpers');

helpers.addHelpers();

var keypress = require('keypress');

var keyEvents = {};
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

function Computer () {}

Computer.prototype.when = function (e, callback) {
    var event = e.split(' ');
    if (event[0] === 'key') {
        keyEvents[event[1]] = callback;
    }
}

var computer = { 
    addComputer: function () {
        return new Computer();
    },
    takePhoto: function () {
        var fileName = Date.now();
        exec('ffmpeg -f avfoundation -video_size 640x480 -framerate 30 -i "0" -vframes 1 ' + fileName + '.jpg', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            } else {
                exec('open -a Preview ' + fileName + '.jpg')
            }
          })
    },
    recordVideo: function (length) {
        var fileName = Date.now();
        exec('ffmpeg -f avfoundation -video_size 640x480 -framerate 30 -t ' + length + ' -i "0:2" ' + fileName + '.mkv', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            } else {
                exec('open -a VLC ' + fileName + '.mkv')
            }
          })
    }
};

module.exports = computer;