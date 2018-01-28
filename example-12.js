var arduino = require('./arduino');
var myArduino = arduino.addArduino();

var computer = require('./computer');
var myComputer = computer.addComputer();


myArduino.when('ready', () => {

    computer.takePhoto()

    computer.recordVideo(10)

})
