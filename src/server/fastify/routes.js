// https://www.fastify.io/docs/latest/Getting-Started/

const fp = require('fastify-plugin');

async function routes(fastify, options, done) {

  // SET UP SQLITE
  fastify.register(require('./fastify-knex'), {
    client: 'sqlite3',
    debug: false, // Knex debug SQL
    //connection: 'url'
    connection: {
      filename: "./mydb.sqlite"
    },
    useNullAsDefault: true //JS?
  });

  // READY LOADED VARS
  fastify.addHook('onReady', async function (done) {

    // https://knexjs.org/#Schema
    try {
      console.log("Check Table");
      //console.log(fastify.knex);

      // Create a table
      //console.log(fastify.knex.schema);
      fastify.knex.schema.hasTable('users').then(function(exists) {
        console.log("users exists:",exists);
        if (!exists) {
          //console.log("CREATE USER TABLE");
          return fastify.knex.schema.createTable('users', function(t) {
            t.increments('id').primary();
            t.string('alias', 100);
            t.string('passphrase', 100);
            t.string('sea');
            t.string('token');
            t.string('auth');
            t.string('key');
            t.string('accessrequest');
            t.string('level');
            t.string('access');
            t.string('date');
            t.text('bio');
          });
        }
        //await fastify.knex.schema
        //.createTable('users', table => {
          //table.increments('id');
          //table.string('user_name');
        //});
      });
      
    } catch(e) {
      console.error(e);
    };
    done();
  });

  fastify.get('/test', async (request, reply) => {
    //console.log(fastify.knex);
    return { hello: 'world test' }
  });
  
  fastify.register(require('./route_game'));

  done();
}

//module.exports = routes
module.exports=fp(routes);