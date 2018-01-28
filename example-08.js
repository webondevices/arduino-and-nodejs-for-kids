var arduino = require('./arduino');
var myArduino = arduino.addArduino();


myArduino.when('ready', () => {

    var redButton = arduino.addButton(2)

    redButton.when('down', () => {
        speak('I pressed the button!!!')
    })

    redButton.when('up', () => {
        speak('The button is up!!!')
    })
    
})
