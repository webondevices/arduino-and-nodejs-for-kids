var arduino = require("./arduino");
var myArduino = arduino.addArduino();

myArduino.when("ready", () => {
  var redLamp1 = arduino.addLed(2);
  var yellowLamp1 = arduino.addLed(4);
  var greenLamp1 = arduino.addLed(6);

  var redLamp2 = arduino.addLed(8);
  var yellowLamp2 = arduino.addLed(10);
  var greenLamp2 = arduino.addLed(12);

  var lampSequence1 = () => {
    // RED LIGHT
    redLamp1.on();
    yellowLamp1.off();
    greenLamp1.off();

    wait(15, () => {
      // RED + ORANGE LIGHT
      redLamp1.on();
      yellowLamp1.on();
      greenLamp1.off();

      wait(2, () => {
        // GREEN LIGHT
        redLamp1.off();
        yellowLamp1.off();
        greenLamp1.on();

        wait(15, () => {
          // ORANGE LIGHT
          redLamp1.off();
          yellowLamp1.on();
          greenLamp1.off();

          wait(2, lampSequence1);
        });
      });
    });
  };

  lampSequence1();

  var lampSequence2 = () => {
    // RED LIGHT
    redLamp2.on();
    yellowLamp2.off();
    greenLamp2.off();

    wait(15, () => {
      // RED + ORANGE LIGHT
      redLamp2.on();
      yellowLamp2.on();
      greenLamp2.off();

      wait(2, () => {
        // GREEN LIGHT
        redLamp2.off();
        yellowLamp2.off();
        greenLamp2.on();

        wait(15, () => {
          // ORANGE LIGHT
          redLamp2.off();
          yellowLamp2.on();
          greenLamp2.off();

          wait(2, lampSequence2);
        });
      });
    });
  };

  wait(17, lampSequence2);
});
