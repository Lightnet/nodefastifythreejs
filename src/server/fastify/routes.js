// https://www.fastify.io/docs/latest/Getting-Started/

async function routes(fastify, options) {
  fastify.get('/test', async (request, reply) => {
    return { hello: 'world test' }
  });

  
  fastify.register(require('./route_game'));



}

module.exports = routes