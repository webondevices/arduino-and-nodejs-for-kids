var five = require('johnny-five');
var helpers = require('./helpers');

helpers.addHelpers();

var board;

var arduino = {
    addArduino: function () {
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
        var led = new five.Led(pin);
        led.lightness = value => {
            led.brightness(value * 25.5);
        };
        return led;
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
        var resetTimer = null;

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

        motor.moveForward = speed => {
            motor.goForward(speed);
            resetTimer = setTimeout(motor.stop, 1000);
        };

        motor.moveBackward = speed => {
            motor.goBackward(speed);
            resetTimer = setTimeout(motor.stop, 1000);
        };

        motor.stop = () => {
            board.pinMode(pwm, five.Pin.PWM);
            board.analogWrite(pwm, 0);
        };

        return motor;
    }
};

module.exports = arduino;