var arduino = require('./arduino')
var myArduino = arduino.addArduino()


myArduino.when('ready', () => {

    var myPrettyLed = arduino.addLed(6)

    myPrettyLed.blink(50)
    myPrettyLed.pulse()
    myPrettyLed.on()
    myPrettyLed.off()
    myPrettyLed.lightness(10)
    
})