/**
 * Name: Node Fastify Three JS
 */

// https://glitch.com/edit/#!/possible-shade-geese?path=server.js%3A29%3A0
// https://babeljs.io/docs/en/
// 
// 
'use strict';
// ESM
import path from "path";
import config from '../../config';
//import config from '../../config';
import Fastify from 'fastify';
const fastify = Fastify({
  logger: false
});

// Setup our static files
//console.log(__dirname);
console.log( path.join(__dirname, "../../public"));

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../../public"),
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

fastify.register(require('fastify-cors'), { 
  // put your options here
  //origin: "http://127.0.0.1:5984",
  //origin: "*",
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE']
})

fastify.register(require('./fastify/routes'));

// Declare a route
fastify.get('/', function (request, reply) {
  //console.log(fastify.knex);
  let user={
    hello:"world param"
  }

  let params = request.query.raw ? {} : { user: user };
  params.hello="world fastify";
  //reply.send({ hello: 'world' })

  request.query.raw
    ? reply.send(params)
    : reply.view("./app/server/views/index.hbs", params);
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

/*
export default function({ types: t }) {
  return{
    start
  };
}
*/

//export const fruits = ['apple', 'orange', 'banana', 'mango', 'plum'];

//module.exports.start=start;
//export default start;
//export default { };
//export {
//  start
//};

