var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    write('I really like this!')

    wait(4, () => {
        write('I have a pigglet')
    })

})