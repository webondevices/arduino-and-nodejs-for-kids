var arduino = require('./arduino');
var myArduino = arduino.addArduino();


myArduino.when('ready', () => {

    write('Hello, I am ready')

    speak('Hello, how are you')
   
})
