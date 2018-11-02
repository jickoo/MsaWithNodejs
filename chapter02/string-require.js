var stringManipulation = require("./string-manipulation");
var stringManipulationRe = require("./string-manipulation-restructured")();

console.log(stringManipulation.stringToOrdinal("aabb"));
console.log(stringManipulationRe.stringToOrdinal("aabb"));
