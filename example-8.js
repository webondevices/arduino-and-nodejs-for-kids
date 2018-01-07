var arduino = require('./arduino');
var myArduino = arduino.addArduino();

var computer = require('./computer');
var myComputer = computer.addComputer();


myArduino.when('ready', () => {

    var Leftwheel = arduino.addMotor(6,5,7)
    var Rightwheel = arduino.addMotor(11,10,12)

    Leftwheel.goForward(10)
    Rightwheel.goForward(10)

    wait(2, () => {
        Leftwheel.goBackward(10)
        Rightwheel.goBackward(10)
    })

    wait(4, () => {
        Leftwheel.stop()
        Rightwheel.stop()
    })
})
