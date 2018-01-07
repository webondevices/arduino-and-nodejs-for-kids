var keypress = require('keypress');
var thisComputer = {};
var keyEvents = {};

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', function (ch, key) {
    if (keyEvents[key.name]) keyEvents[key.name]();

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      }
});

var thisComputer = {};

var computer = {
    addComputer: function () {
        thisComputer.when = function (event, callback) {
            var event = event.split(' ');
            if (event[0] === 'key') {
                keyEvents[event[1]] = callback;
            }    
        };

        return thisComputer;
    }
};

module.exports = computer;