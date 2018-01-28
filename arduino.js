const five = require('johnny-five');
const helpers = require('./helpers');

helpers.addHelpers();

let board;

const arduino = {
    addArduino () {
        board = new five.Board({repl: false});
        board.when = board.on;
        return board;
    },
    addButton (pin) {
        const button = new five.Button(pin);
        button.when = button.on;
        return button;
    },
    addLed (pin) {
        const led = new five.Led(pin);
        led.lightness = value => {
            led.brightness(value * 25.5);
        };
        return led;
    },
    addSensor (pin) {
        const sensor = new five.Sensor({
            pin: 'A' + pin,
            freq: 1000
        });
        sensor.when = sensor.on;
        return sensor;
    },
    addLightSensor (pin) {
        return this.addSensor(pin);
    },
    addMotionSensor (pin) {
        const motion = new five.Motion(pin);
        motion.when = motion.on;
        return motion;
    },
    addMatrix (data, cs, clock) {
        return new five.Led.Matrix({pins: {data, cs, clock}});
    },
    addMotor (pwm, dir, cdir) {
        const motor = {};
        const dir = new five.Pin(dir);
        const cdir = new five.Pin(cdir);
        let resetTimer = null;

        board.pinMode(pwm, five.Pin.PWM);

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