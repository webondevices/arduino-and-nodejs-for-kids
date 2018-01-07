var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    var myName = 'Maya'
    var myBrothersName = 'Emil'

    write('My pretty name is ' + myName)
    
    write('My brothers name is ' + myBrothersName)

})