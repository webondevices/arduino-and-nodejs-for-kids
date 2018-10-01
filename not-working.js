var arduino = require("./arduino");
var myArduino = arduino.addArduino();

myArduino.when("ready", () => {
  var yellowLamp1 = arduino.addLed(4);
  var yellowLamp2 = arduino.addLed(10);

  yellowLamp1.blink(500);
  yellowLamp2.blink(500);
});
