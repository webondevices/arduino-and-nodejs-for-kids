var computer = require("./computer");

var fiveMinutes = 60 * 5;
var infinity = Number.POSITIVE_INFINITY;

repeat(infinity, fiveMinutes, () => {
  computer.takePhoto();
});
