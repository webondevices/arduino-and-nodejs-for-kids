var arduino = require('./arduino');
var myArduino = arduino.addArduino();

var computer = require('./computer');
var myComputer = computer.addComputer();


myArduino.when('ready', () => {
    
    myComputer.when('key p', () => {
        write('You pressed the P key!')
    })
    
})
