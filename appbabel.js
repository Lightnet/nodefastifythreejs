// https://www.npmjs.com/package/esm
console.log("Init Server Node");

require = require("esm")(module/*, options*/)
//module.exports = require("./src/server/server.js");
var _server = module.exports = require("./src/server/fastifyserver.js");
console.log(_server);
var server = _server.default();
server.start();

console.log("END SERVER...");