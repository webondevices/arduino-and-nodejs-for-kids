var arduino = require('./arduino');
var myArduino = arduino.addArduino();


myArduino.when('ready', () => {

    var mySensor = arduino.addMotionSensor(2)

    mySensor.when('motionstart', () => {
        speak('I can see some movement!!!')
    })

    mySensor.when('motionend', () => {
        speak('The motion is finished!!!')
    })
    
})
