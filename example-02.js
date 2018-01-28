var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    var mayasBalls = 2
    var emilsBalls = 1

    if (mayasBalls > emilsBalls) {
        write('Maya has more balls than Emil!')
    } else {
        write('May does NOT have more balls than Emil!');
    }

    if (mayasBalls == emilsBalls) {
        write('Maya and Emil has the same number of balls!')
    }

})