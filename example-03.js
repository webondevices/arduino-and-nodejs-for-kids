var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    var mayasBalls = 2
    var emilsBalls = 1
    var matesBalls = 9

    write('Balls in total: ' + (mayasBalls + emilsBalls + matesBalls))

})