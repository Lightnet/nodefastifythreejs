console.log("EXPORT FILE SERVER TEST...");

//const devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

//const port = process.env.PORT;
//console.log(port);
//console.log(process.argv);
//console.log(process.env);

//var _server = require("./server/server.js");
var _server = require("./server/fastifyserver.js");
//console.log(_server.default());
var server = _server.default();
server.start();