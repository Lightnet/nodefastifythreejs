console.log("EXPORT FILE SERVER TEST...");
var _server = require("./server/server.js");
//console.log(_server.default());
var server = _server.default();
server.start();