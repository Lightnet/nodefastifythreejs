/**
 * 
 * @param {*} fastify 
 * @param {*} options 
 */

const fp = require('fastify-plugin');

async function route(fastify, options) {
  fastify.get('/game', async (request, reply) => {
    //return { hello: 'world test' }
    let user={
      hello:"world param"
    }
    let params = request.query.raw ? {} : { user: user };

    reply.view("./app/server/views/game.hbs", params);
  })
}

module.exports = fp(route);