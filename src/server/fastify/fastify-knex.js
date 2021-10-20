// https://github.com/rhzs/fastify-knex/blob/master/index.js
// https://github.com/rhzs/fastify-knex

'use strict';

const fp = require('fastify-plugin');
var knex = require('knex');

function fastifyKnex (fastify, options, next) {
  if (!fastify.knex) {
    const con = knex(options)
    fastify.decorate('knex', con)
  }

  next()
}

module.exports = fp(fastifyKnex)