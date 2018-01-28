var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    repeat(5, 2, () => {
        write('Hello!')
    })

})