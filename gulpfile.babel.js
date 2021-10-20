// https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles/
// https://markgoodyear.com/2015/06/using-es6-with-gulp/
// https://firxworx.com/blog/wordpress/using-gulp4-and-rsync-to-deploy-locally-and-beyond/

// https://www.npmjs.com/package/gulp-rollup-2
// https://www.devextent.com/import-es-modules-in-nodejs-with-typescript-and-babel/
// https://morioh.com/p/7f28530e951d

import { src, dest, watch, parallel, series, log } from 'gulp';

//import nodemon from 'gulp-nodemon';

import config from'./config';
import babel from "gulp-babel";
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import size from 'gulp-size';

//const browserSync = require('browser-sync').create();

import {spawn } from 'child_process';
let node;

//BASIC ACCESS
const src_client_files=[
  './src/client/client.js'
];

//SERVER ACCESS
const src_server_files=[
  './src/server/server.js'
  , './src/server/**/*.js'
];

//GAME FILES
const src_client_game_files=[
  './src/client/client_game.js'
  , './src/client/a.js'
];

const src_hbs_files=[
  './src/server/views/*.hbs'
];

const output_dest='public';
const output_server_dest='server';

// CLIENT BUILD
function client_build(callback){
  // task
  return src(src_client_files)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(dest(output_dest));
  //cb();
}
exports.client_build = client_build;

// HBS BUILD
function hbs_build(callback){
  // task
  return src(src_hbs_files)
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(size())
    .pipe(dest(output_server_dest+"/views"));
  //callback();
}
exports.hbs_build = hbs_build;

// SERVER BUILD
function server_build(callback){
  // task
  return src(src_server_files)
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: [
        ["@babel/plugin-transform-runtime"]
      ]
    }))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(size())
    .pipe(dest(output_server_dest));
  //callback();
}
exports.server_build = server_build;

function client_game_build(callback){
  return src(src_client_game_files)
    /*
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: [
        ["@babel/plugin-transform-runtime"]
      ]
    }))
    */
    //.pipe(buffer())
    //.pipe(uglify())
    .pipe(size())
    .pipe(dest(output_dest));
}
exports.client_game_build = client_game_build;

//WATCH FILES
function watchFiles(callback) {

  watch(src_client_files, client_build);
  watch(src_server_files, server_build);
  watch(src_hbs_files, hbs_build);

  watch(src_client_game_files, client_game_build);
  watch([
    './src/**/*.js'
    //'./src/client/**/*.js'
    //, './src/server/**/*.js'
    , './src/server/views/*.hbs'
  ], reload_server);

  callback();
}

// https://gist.github.com/webdesserts/5632955
//nodejs functions
function reload_server(done) {
  console.log("Check Reload Server:");
  if (node) node.kill();
  let serverfile='./appserver.js';
  node = spawn('node', [serverfile], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
      return done();
    }
    console.log('Closed Server!');
    return done();
  });
  node.on('spawn', function (code) {
    console.log('Start Server!');
    done();
  });
  return;
  //done();
}
exports.reload_server = reload_server;

//EXPORT DEFAULT
exports.default = series(
  client_build
  , server_build
  , client_game_build
  , hbs_build
  , watchFiles
  , reload_server
);

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) node.kill()
})