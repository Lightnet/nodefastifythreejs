/**
 * Testing fastify server
 */

// https://glitch.com/edit/#!/possible-shade-geese?path=server.js%3A29%3A0
// https://babeljs.io/docs/en/
'use strict';
// ESM
//import path from "path";
import config from '../config';
import Fastify from 'fastify';
const fastify = Fastify({
  logger: false
});
/*
// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});
*/
// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

// Run the server!
async function start(){
  let PORT = config.port || 3000;
  try {
    
    fastify.listen(PORT, function (err, address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
//start();

export default function() {
  return{
    start
  };
}