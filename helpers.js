var say = require('say');

function addHelpers () {
    global.write = console.log;
    global.wait = function (s, cb) {
        setTimeout(cb, s * 1000);
    }
    global.speak = function (msg) {
        say.speak(msg);
    };
    global.toPercent = function (value) {
        return Math.round(((1024 - value) / 1024) * 100);
    };
    global.forever = Number.POSITIVE_INFINITY;
    global.never = 0;
    global.repeat = function (iterations, delay, callback) {
        var count = 0;
        var timer = null;

        var iterate = function() {
            if (count < iterations) {
                callback(count + 1);
                timer = setTimeout(iterate, delay * 1000);
                count++;
            }
        };

        iterate();
        
    };
}

module.exports = {
    addHelpers: addHelpers
}