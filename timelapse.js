var computer = require("./computer");

var fiveMinutes = 5 * 60;

repeat(infinity, fiveMinutes, () => {
  computer.takePIPhoto();
});
