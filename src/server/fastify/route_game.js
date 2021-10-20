



async function routes(fastify, options) {
  fastify.get('/game', async (request, reply) => {
    //return { hello: 'world test' }
    let user={
      hello:"world param"
    }
    let params = request.query.raw ? {} : { user: user };

    reply.view("./server/views/game.hbs", params);
  })
}

module.exports = routes