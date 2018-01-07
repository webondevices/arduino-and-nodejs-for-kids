var five = require('johnny-five');
var say = require('say');

var board;

var arduino = {
    setup: function() {
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
    },
    addArduino: function () {
        this.setup();
        board = new five.Board({repl: false});
        board.when = board.on;
        return board;
    },
    addButton: function (pin) {
        var button = new five.Button(pin);
        button.when = button.on;
        return button;
    },
    addLed: function (pin) {
        return new five.Led(pin);
    },
    addSensor: function (pin) {
        var sensor = new five.Sensor({
            pin: 'A' + pin,
            freq: 1000
        });
        sensor.when = sensor.on;
        return sensor;
    },
    addLightSensor: this.addSensor,
    addMotionSensor: function (pin) {
        var motion = new five.Motion(pin);
        motion.when = motion.on;
        return motion;
    },
    addMatrix: function (data, cs, clock) {
        return new five.Led.Matrix({pins: {data, cs, clock}});
    },
    addMotor: function (pwm, dir, cdir) {
        var motor = {};
        board.pinMode(pwm, five.Pin.PWM);
        var dir = new five.Pin(dir);
        var cdir = new five.Pin(cdir);

        motor.goForward = speed => {
            dir.low();
            cdir.high();
            board.analogWrite(pwm, speed * 25.5);
        };
        motor.goBackward = speed => {
            dir.high();
            cdir.low();
            board.analogWrite(pwm, speed * 25.5);
        };

        motor.stop = () => {
            board.pinMode(pwm, five.Pin.PWM);
            board.analogWrite(pwm, 0);
        }

        return motor;
    }
};

module.exports = arduino;